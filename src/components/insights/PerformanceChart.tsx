import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CategoryInsight } from '../../utils/insights';

interface PerformanceChartProps {
  categories: CategoryInsight[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ categories }) => {
  const chartData = categories.map(category => ({
    subject: category.name,
    score: category.score
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};