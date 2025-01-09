import React from 'react';
import { getScoreColor, getScoreBackground } from '../../utils/score';

interface ScoreCardProps {
  label: string;
  score: number;
  description?: string;
  icon?: React.ReactNode;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  label,
  score,
  description,
  icon
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        {icon && <div className={getScoreColor(score)}>{icon}</div>}
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-semibold">{score}%</h3>
            <span className={`text-sm font-medium ${getScoreBackground(score)} px-2 py-0.5 rounded-full`}>
              {label}
            </span>
          </div>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};