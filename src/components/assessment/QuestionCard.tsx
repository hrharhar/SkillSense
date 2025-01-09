import React from 'react';
import { Question } from '../../types';
import { QuestionOption } from './QuestionOption';
import { KeyboardHint } from './KeyboardHint';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  currentAnswer?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onNext,
  currentAnswer
}) => {
  useKeyboardNavigation({
    onSelect: (index) => {
      if (question.options) {
        onAnswer(question.id, question.options[index]);
      }
    },
    onNext,
    optionsCount: question.options?.length || 0,
    isEnabled: true,
    hasAnswer: !!currentAnswer
  });

  const handleOptionSelect = (option: string) => {
    onAnswer(question.id, option);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
        {question.prompt}
      </h3>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <QuestionOption
              key={option}
              index={index}
              option={option}
              selected={currentAnswer === option}
              onSelect={() => handleOptionSelect(option)}
            />
          ))}
        </div>
      )}

      <KeyboardHint />
    </div>
  );
};