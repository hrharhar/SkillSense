import React from 'react';
import { AssessmentInsight } from '../../utils/insights';
import { PerformanceChart } from './PerformanceChart';

interface AssessmentOverviewProps {
  insight: AssessmentInsight;
}

export const AssessmentOverview: React.FC<AssessmentOverviewProps> = ({ insight }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Overall Assessment</h3>
        <p className="text-gray-600">{insight.overallFeedback}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
        <PerformanceChart categories={insight.categories} />
      </div>
    </div>
  );
};