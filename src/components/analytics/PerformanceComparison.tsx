import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PerformanceMetrics } from '../../utils/analytics';

interface PerformanceComparisonProps {
  metrics: PerformanceMetrics;
}

export const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({ metrics }) => {
  const data = metrics.categoryMetrics.map(category => ({
    name: category.name.split(' ').length > 1 ? category.name.split(' ').map(word => word[0]).join('') : category.name,
    fullName: category.name,
    average: category.averageScore,
    highest: category.highestScore,
    lowest: category.lowestScore
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis 
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value: number, name: string) => [`${value}%`, name]}
            labelFormatter={(label) => data.find(item => item.name === label)?.fullName || label}
          />
          <Legend />
          <Bar 
            dataKey="average" 
            name="Average Score" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="highest" 
            name="Highest Score" 
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="lowest" 
            name="Lowest Score" 
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};