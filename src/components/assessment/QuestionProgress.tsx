import React from 'react';

interface QuestionProgressProps {
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionProgress: React.FC<QuestionProgressProps> = ({
  currentIndex,
  totalQuestions
}) => {
  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {currentIndex + 1} of {totalQuestions}
        </h2>
        <div className="text-sm font-medium text-gray-500">
          Progress: {progress}%
        </div>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
          <span>Start</span>
          <span>Finish</span>
        </div>
      </div>
    </div>
  );
};