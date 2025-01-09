import React from 'react';
import { AssessmentInsight } from '../../utils/insights';
import { ScoreCard } from './ScoreCard';
import { CategorySummary } from './CategorySummary';
import { PerformanceChart } from './PerformanceChart';
import { Brain } from 'lucide-react';

interface ResultsSummaryProps {
  insight: AssessmentInsight;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ insight }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard
          label="Overall Score"
          score={insight.overallScore}
          icon={<Brain className="w-8 h-8" />}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-6">Performance Overview</h3>
        <PerformanceChart categories={insight.categories} />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Category Breakdown</h3>
        {insight.categories.map(category => (
          <CategorySummary key={category.name} insight={category} />
        ))}
      </div>
    </div>
  );
};