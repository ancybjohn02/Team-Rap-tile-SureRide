import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

const HeatMap = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [surgeData, setSurgeData] = useState([]);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const mapFrameRef = useRef(null);
  
  // Mock data for surge areas (would come from an API in production)
  const generateMockSurgeData = (centerLat, centerLng) => {
    const surgePoints = [];
    
    // Generate some random surge points around the center location (1km radius)
    for (let i = 0; i < 15; i++) {
      // Random offset in latitude/longitude (roughly 1km)
      const latOffset = (Math.random() - 0.5) * 0.018; 
      const lngOffset = (Math.random() - 0.5) * 0.018;
      
      surgePoints.push({
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
        intensity: Math.random() * 10 // Random intensity value between 0-10
      });
    }
    
    return surgePoints;
  };
  
  const detectLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Generate mock surge data around the user's location
          const data = generateMockSurgeData(latitude, longitude);
          setSurgeData(data);
          
          // Attempt to update the map iframe location
          updateMapLocation(latitude, longitude);
          
          setLoading(false);
          setIsLocationEnabled(true);
        },
        (err) => {
          setError(`Error getting location: ${err.message}`);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };
  
  const updateMapLocation = (lat, lng) => {
    // In a real implementation, you would use Mapbox GL JS API to update the map center
    // For iframe integration, we would need to communicate with the iframe content
    // This is a simplified approach - in production, consider using the Mapbox SDK directly
    if (mapFrameRef.current) {
      try {
        // For iframe integration, in reality you would need more complex messaging
        console.log(`Map would be centered at: ${lat}, ${lng} with 1km zoom`);
        
        // Note: Due to iframe restrictions, directly manipulating the iframe content
        // would require the iframe to be from the same origin or use postMessage
      } catch (err) {
        console.error("Error updating map:", err);
      }
    }
  };
  
  const refreshMap = () => {
    if (isLocationEnabled && location) {
      // Regenerate surge data when refreshing
      const newData = generateMockSurgeData(location.lat, location.lng);
      setSurgeData(newData);
      
      // Update map location again
      updateMapLocation(location.lat, location.lng);
    }
  };
  
  // Handle map iframe load
  const handleMapLoad = () => {
    setMapLoaded(true);
  };
  
  // Determine if there's high surge
  const hasHighSurge = surgeData.length > 0 && 
    (surgeData.reduce((sum, point) => sum + point.intensity, 0) / surgeData.length > 5);
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Location Heat Map</h2>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={detectLocation}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Detecting Location..." : "Enable Location"}
          </button>
          
          <button
            onClick={refreshMap}
            disabled={!isLocationEnabled || loading}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-300"
          >
           Report
          </button>
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {/* Mapbox iframe with your provided URL */}
        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
          <iframe 
            ref={mapFrameRef}
            className="mau border border-warning"
            width="100%" 
            height="500px" 
            src="https://api.mapbox.com/styles/v1/harshita2209/cm84dj4mw000801s8b67d9w0u.html?title=false&access_token=pk.eyJ1IjoiaGFyc2hpdGEyMjA5IiwiYSI6ImNsbnBpMDB1YTBveWUyam82NGdtMnB1cGgifQ.Evik1oGdyZQGdNUqTWL_bw&zoomwheel=false#2/38/-34" 
            title="Mapbox Heat Map"
            onLoad={handleMapLoad}
          />
          
          {/* Surge indicator overlay */}
          {hasHighSurge && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              High Surge Detected
            </div>
          )}
          
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <div className="text-center text-sm">Detecting location...</div>
              </div>
            </div>
          )}
        </div>
        
        {location && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Current Location</h3>
            <p className="text-sm text-gray-600">Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
            <p className="text-sm text-gray-600">Surge points in 1km radius: {surgeData.length}</p>
            <div className="mt-2">
              <p className="text-sm font-medium">Surge Level: {hasHighSurge ? 
                <span className="text-red-600 font-bold">HIGH</span> : 
                <span className="text-green-600">Normal</span>}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatMap;


// import React from 'react'

// const Heatmap = () => {
//   return (
//     <div>
//    <iframe className='mau border border-warning'      width='100%' height='634px' src="https://api.mapbox.com/styles/v1/harshita2209/cm84dj4mw000801s8b67d9w0u.html?title=false&access_token=pk.eyJ1IjoiaGFyc2hpdGEyMjA5IiwiYSI6ImNsbnBpMDB1YTBveWUyam82NGdtMnB1cGgifQ.Evik1oGdyZQGdNUqTWL_bw&zoomwheel=false#2/38/-34" title="try" ></iframe>
//     </div>
//   )
// }

// export default Heatmap
// #style="border:none;
{/* <iframe width='100%' height='400px' src="https://api.mapbox.com/styles/v1/harshita2209/cm843bj9n001i01si58u49zo1.html?title=false&access_token=pk.eyJ1IjoiaGFyc2hpdGEyMjA5IiwiYSI6ImNsbnBpMDB1YTBveWUyam82NGdtMnB1cGgifQ.Evik1oGdyZQGdNUqTWL_bw&zoomwheel=false#3.16/37.41/-93.18" title="Example: heatmap layer" ></iframe>*/}