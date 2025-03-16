import { useState } from "react";

const PredictAcceptance = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: source.split(",").map(Number),
        destination: destination.split(",").map(Number),
      }),
    });

    const data = await response.json();
    setResult(data.acceptance_probability);
  };

  return (
    <div className="bigi">
      <h2 className="bigu">Predict Acceptance Probability</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Source (lat,lon)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination (lat,lon)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit">Predict</button>
      </form>
      {result !== null && <p>Acceptance Probability: {result.toFixed(2)}</p>}
    </div>
  );
};

export default PredictAcceptance;
