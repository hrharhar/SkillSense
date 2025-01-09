import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuestionNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  hasAnswer: boolean;
  isLastQuestion: boolean;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  hasAnswer,
  isLastQuestion
}) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <span className="text-sm text-gray-500">
        Question {currentIndex + 1} of {totalQuestions}
      </span>

      <Button
        variant="primary"
        onClick={onNext}
        disabled={!hasAnswer}
        className="flex items-center gap-2"
      >
        {isLastQuestion ? 'Submit Assessment' : 'Next'}
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};