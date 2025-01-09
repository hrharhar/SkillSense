import React from 'react';
import { Brain, MessageSquare, Lightbulb, ClipboardCheck, Box, ChevronDown, ChevronUp } from 'lucide-react';
import { CategoryInsight } from '../../utils/insights';

interface CategoryBreakdownProps {
  category: CategoryInsight;
  expanded: boolean;
  onToggle: () => void;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  category,
  expanded,
  onToggle
}) => {
  const getIcon = () => {
    switch (category.name) {
      case 'Problem Solving':
        return <Brain className="w-6 h-6" />;
      case 'Critical Thinking':
        return <Lightbulb className="w-6 h-6" />;
      case 'Communication':
        return <MessageSquare className="w-6 h-6" />;
      case 'Understanding Instructions':
        return <ClipboardCheck className="w-6 h-6" />;
      case 'Spatial Reasoning':
        return <Box className="w-6 h-6" />;
      default:
        return <Brain className="w-6 h-6" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={getScoreColor(category.score)}>{getIcon()}</div>
            <div>
              <h4 className="text-lg font-semibold">{category.name}</h4>
              <p className="text-sm text-gray-600">
                {category.correctCount} out of {category.totalQuestions} questions answered correctly
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
              {category.score}%
            </p>
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="px-6 pb-6 border-t pt-4">
          <p className="text-gray-600">{category.feedback}</p>
        </div>
      )}
    </div>
  );
};