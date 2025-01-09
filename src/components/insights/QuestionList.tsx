import React, { useState } from 'react';
import { Question } from '../../types';
import { QuestionAnalysis } from './QuestionAnalysis';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionListProps {
  questions: Question[];
  answers: Record<string, string>;
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions, answers }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const correctAnswers = questions.filter(
    question => answers[question.id] === question.correctAnswer
  ).length;

  const accuracy = Math.round((correctAnswers / questions.length) * 100);

  return (
    <div className="space-y-6">
      <div 
        className="bg-white rounded-xl shadow-sm p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Question Analysis</h3>
            <p className="text-gray-600 mt-1">
              {correctAnswers} out of {questions.length} questions answered correctly ({accuracy}% accuracy)
            </p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <QuestionAnalysis
              key={question.id}
              question={question}
              userAnswer={answers[question.id]}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};