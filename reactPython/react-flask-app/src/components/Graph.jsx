import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { index: 0, value: 0.8929 },
  { index: 1, value: 0.7079 },
  { index: 2, value: 0.3604 },
  { index: 3, value: 0.8081 },
  { index: 4, value: 1.4286 },
  { index: 5, value: 0.8333 },
  { index: 6, value: 2.18 },
  { index: 7, value: 0.4726 },
  { index: 8, value: 0.6803 },
  { index: 9, value: 0.3791 },
  { index: 10, value: 1.0811 },
  { index: 11, value: 1.0694 },
  { index: 12, value: 1.2759 },
  { index: 13, value: 1.1837 },
  { index: 14, value: 0.8010 },
  { index: 15, value: 0.9703 },
  { index: 16, value: 1.4815 },
  { index: 17, value: 0.5676 },
  { index: 18, value: 0.5320 },
  { index: 19, value: 0.4555 },
  { index: 20, value: 0.7212 },
  { index: 21, value: 0.7086 },
  { index: 22, value: 0.9604 },
  { index: 23, value: 0.7479 },
];

const Graph = () => {
  return (
    <div>

    <h2 className="supply">Supply Demand Ratio Per Hour</h2>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" label={{ value: "Hours", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "SupplyDemandRatio", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default Graph;
