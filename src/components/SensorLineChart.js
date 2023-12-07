import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SensorLineChart = ({ data, category }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={700} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis dataKey={category} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={category} stroke="#8884d8" name={category.toUpperCase()} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorLineChart;
