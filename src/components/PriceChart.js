import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useMemo } from 'react';
import { format } from 'date-fns';

const PriceChart = ({ data }) => {
    const chartData = useMemo(() => {
      return data.map(item => ({
        date: format(new Date(item.asOfDate), 'MMM dd'),
        close: item.close,
        open: item.open
      }));
    }, [data]);
  
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" name="Close Price" />
          <Line type="monotone" dataKey="open" stroke="#82ca9d" name="Open Price" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

export default PriceChart;