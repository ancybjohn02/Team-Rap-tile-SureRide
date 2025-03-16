import { useState } from "react";

const RouteCalculator = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ✅ Define getCoordinates function inside the component
  const getCoordinates = async (place) => {
    const apiKey = "AIzaSyDgKht7QFWBJZs8keoLq3E31vgfC8orOzE"; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        return data.results[0].geometry.location; // { lat: ..., lng: ... }
      } else {
        console.error("Geocoding API error:", data.status);
        return null;
      }
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      return null;
    }
  };

  const handleCalculate = async () => {
    setError("");

    if (!source || !destination) {
      setError("Please enter both source and destination.");
      return;
    }

    // ✅ Now getCoordinates is defined, so no error
    const sourceCoords = await getCoordinates(source);
    const destinationCoords = await getCoordinates(destination);

    if (!sourceCoords || !destinationCoords) {
      setError("Failed to get coordinates. Please check the location names.");
      return;
    }

    // Send coordinates to Flask API
    try {
      const response = await fetch("http://127.0.0.1:5000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: sourceCoords,
          destination: destinationCoords,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error sending request:", err);
      setError("Failed to process request.");
    }
  };

  return (
    <div>
      <h2 className="poppins-semibold">Peak Hour Status</h2>
      <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="inputPassword6" class="col-form-label">Source    </label>
  </div>
  <div class="col-auto inp">
    {/* <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline"/> */}
      <input  type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
  </div>
  <div class="col-auto">
    {/* <span id="passwordHelpInline" class="form-text">
      Must be 8-20 characters long.
    </span> */}
  </div>
</div>

<div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="inputPassword6" class="col-form-label">Destination</label>
  </div>
  <div class="col-auto">
    {/* <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline"> */}
      <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
  </div>
  <div class="col-auto">
    {/* <span id="passwordHelpInline" class="form-text">
      Must be 8-20 characters long.
    </span> */}
  </div>
</div>


      {/* <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} /> */}
      {/* <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} /> */}
      {/* <button onClick={handleCalculate}>Calculate</button> */}
      <button onClick={handleCalculate} type="button" class="btn btn-primary">Calculate</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default RouteCalculator;