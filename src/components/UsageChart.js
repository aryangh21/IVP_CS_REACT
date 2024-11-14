import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const data = [
  { name: 'Jan', thisYear: 4000, lastYear: 2400 },
  { name: 'Feb', thisYear: 3000, lastYear: 1398 },
  { name: 'Mar', thisYear: 2000, lastYear: 9800 },
  { name: 'Apr', thisYear: 2780, lastYear: 3908 },
  { name: 'May', thisYear: 1890, lastYear: 4800 },
  { name: 'Jun', thisYear: 2390, lastYear: 3800 },
  { name: 'Jul', thisYear: 3490, lastYear: 4300 },
];

function UsageChart() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>App Usage</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="thisYear" fill="#8884d8" />
          <Bar dataKey="lastYear" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default UsageChart;
