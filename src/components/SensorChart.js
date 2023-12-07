import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SensorChart = ({ data }) => {
  console.log(data);
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis dataKey="velocity" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="velocity" stroke="#8884d8" name="Velocity" />
      <Line type="monotone" dataKey="temperature" stroke="#82ca9d" name="Temperature" />
      <Line type="monotone" dataKey="altitude" stroke="#ffc658" name="Altitude" />
    </LineChart>
  );
};

export default SensorChart;
