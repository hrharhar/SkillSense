import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendData } from '../../utils/analytics';

interface TrendChartProps {
  data: TrendData[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis 
            yAxisId="left"
            domain={[0, 100]} 
            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={[0, 'auto']}
            label={{ value: 'Candidates', angle: 90, position: 'insideRight' }}
          />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value: number, name: string) => [
              name === 'Average Score' ? `${value}%` : value,
              name
            ]}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="averageScore"
            name="Average Score"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalCandidates"
            name="Total Candidates"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};