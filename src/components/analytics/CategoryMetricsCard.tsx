import React from 'react';
import { CategoryMetrics } from '../../utils/analytics';
import { getScoreColor } from '../../utils/score';

interface CategoryMetricsCardProps {
  metrics: CategoryMetrics;
}

export const CategoryMetricsCard: React.FC<CategoryMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h4 className="text-lg font-semibold mb-4">{metrics.name}</h4>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Average Score</span>
          <span className={`font-semibold ${getScoreColor(metrics.averageScore)}`}>
            {metrics.averageScore.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Highest Score</span>
          <span className="font-semibold text-green-600">
            {metrics.highestScore.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Lowest Score</span>
          <span className="font-semibold text-red-600">
            {metrics.lowestScore.toFixed(1)}%
          </span>
        </div>

        <div className="pt-4 border-t">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Score Distribution</h5>
          <div className="flex gap-2">
            <div className="flex-1 bg-green-100 rounded p-2 text-center">
              <div className="text-lg font-semibold text-green-700">
                {metrics.distribution.excellent}
              </div>
              <div className="text-xs text-green-600">Excellent</div>
            </div>
            <div className="flex-1 bg-yellow-100 rounded p-2 text-center">
              <div className="text-lg font-semibold text-yellow-700">
                {metrics.distribution.good}
              </div>
              <div className="text-xs text-yellow-600">Good</div>
            </div>
            <div className="flex-1 bg-red-100 rounded p-2 text-center">
              <div className="text-lg font-semibold text-red-700">
                {metrics.distribution.needsImprovement}
              </div>
              <div className="text-xs text-red-600">Needs Improvement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};