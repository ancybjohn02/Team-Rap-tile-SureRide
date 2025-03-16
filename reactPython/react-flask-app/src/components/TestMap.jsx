import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGFyc2hpdGEyMjA5IiwiYSI6ImNsbnBpMDB1YTBveWUyam82NGdtMnB1cGgifQ.Evik1oGdyZQGdNUqTWL_bw';

const LiveHeatmap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize mapbox
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-95.7129, 37.0902], // Center of US
        zoom: 3
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Wait for map to load
      map.current.on('load', async () => {
        try {
          // Fetch earthquake data from USGS API (as an example of live data)
          const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson');
          const data = await response.json();
          
          // Add a source for the heatmap
          map.current.addSource('earthquakes', {
            type: 'geojson',
            data: data
          });

          // Add heatmap layer
          map.current.addLayer({
            id: 'earthquakes-heat',
            type: 'heatmap',
            source: 'earthquakes',
            maxzoom: 9,
            paint: {
              // Increase weight based on magnitude
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                0, 0,
                6, 1
              ],
              // Increase intensity as zoom level increases
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 1,
                9, 3
              ],
              // Color based on magnitude
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
              ],
              // Radius increases with zoom level
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 2,
                9, 20
              ],
              // Opacity decreases with zoom level
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, 1,
                9, 0.5
              ],
            }
          });

          // Add circle layer for more precise viewing at higher zoom levels
          map.current.addLayer({
            id: 'earthquakes-point',
            type: 'circle',
            source: 'earthquakes',
            minzoom: 7,
            paint: {
              // Size based on magnitude
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, [
                  'interpolate',
                  ['linear'],
                  ['get', 'mag'],
                  1, 1,
                  6, 4
                ],
                16, [
                  'interpolate',
                  ['linear'],
                  ['get', 'mag'],
                  1, 5,
                  6, 50
                ]
              ],
              // Color based on magnitude
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                1, 'rgba(33,102,172,0.5)',
                2, 'rgb(103,169,207)',
                3, 'rgb(209,229,240)',
                4, 'rgb(253,219,199)',
                5, 'rgb(239,138,98)',
                6, 'rgb(178,24,43)'
              ],
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7, 0,
                8, 1
              ]
            }
          });

          // Add popups on click
          map.current.on('click', 'earthquakes-point', (e) => {
            const properties = e.features[0].properties;
            const magnitude = properties.mag;
            const place = properties.place;
            const time = new Date(properties.time).toLocaleString();

            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <h3>Earthquake Details</h3>
                <p>Magnitude: ${magnitude}</p>
                <p>Location: ${place}</p>
                <p>Time: ${time}</p>
              `)
              .addTo(map.current);
          });

          // Change cursor on hover
          map.current.on('mouseenter', 'earthquakes-point', () => {
            map.current.getCanvas().style.cursor = 'pointer';
          });
          map.current.on('mouseleave', 'earthquakes-point', () => {
            map.current.getCanvas().style.cursor = '';
          });

          // Set up auto refresh every 5 minutes
          const refreshData = async () => {
            try {
              const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson');
              const newData = await response.json();
              map.current.getSource('earthquakes').setData(newData);
            } catch (err) {
              console.error('Failed to refresh data:', err);
            }
          };

          // Set up refresh interval
          const interval = setInterval(refreshData, 5 * 60 * 1000); // 5 minutes

          setLoading(false);

          // Clean up interval on unmount
          return () => clearInterval(interval);
        } catch (err) {
          console.error('Error loading data:', err);
          setError('Failed to load earthquake data. Please try again later.');
          setLoading(false);
        }
      });
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>Loading map data...</div>}
      {error && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: 'red' }}>{error}</div>}
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LiveHeatmap;