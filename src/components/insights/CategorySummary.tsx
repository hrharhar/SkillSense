import React from 'react';
import { CategoryInsight } from '../../utils/insights';
import { getScoreColor, getScoreBackground } from '../../utils/score';
import { CATEGORIES } from '../../constants/categories';

interface CategorySummaryProps {
  insight: CategoryInsight;
}

export const CategorySummary: React.FC<CategorySummaryProps> = ({ insight }) => {
  const category = CATEGORIES.find(c => c.name === insight.name);
  const Icon = category?.icon;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`${getScoreColor(insight.score)} p-2 rounded-lg bg-opacity-10`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{insight.name}</h3>
            <span className={`${getScoreBackground(insight.score)} px-2 py-1 rounded-full text-sm font-medium`}>
              {insight.score}%
            </span>
          </div>
          <p className="mt-2 text-gray-600">{insight.feedback}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <span>{insight.correctCount} correct</span>
            <span>•</span>
            <span>{insight.totalQuestions - insight.correctCount} incorrect</span>
          </div>
        </div>
      </div>
    </div>
  );
};