import React from 'react';
import { Question } from '../../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuestionAnalysisProps {
  question: Question;
  userAnswer?: string;
  index: number;
}

export const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({
  question,
  userAnswer,
  index
}) => {
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm text-gray-500">Question {index + 1}</span>
            <h4 className="text-lg font-medium text-gray-900">{question.prompt}</h4>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {question.options?.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className={`p-4 rounded-lg transition-colors ${
              option === userAnswer && !isCorrect
                ? 'bg-red-50 border border-red-200'
                : option === question.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : option === userAnswer
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                option === userAnswer
                  ? isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  : option === question.correctAnswer
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {String.fromCharCode(65 + optionIndex)}
              </div>
              <span className="flex-1 text-gray-700">{option}</span>
              {option === userAnswer && !isCorrect && (
                <span className="text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  Your answer
                </span>
              )}
              {option === question.correctAnswer && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Correct answer
                </span>
              )}
            </div>
          </div>
        ))}

        {!isCorrect && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900">Explanation</h5>
                <p className="mt-1 text-blue-800">
                  The correct answer is {question.correctAnswer}. This question tests your ability to {
                    question.id.startsWith('ps') ? 'solve problems systematically' :
                    question.id.startsWith('ct') ? 'think critically and analyze information' :
                    question.id.startsWith('com') ? 'communicate effectively' :
                    question.id.startsWith('ui') ? 'understand and follow instructions' :
                    'visualize and manipulate spatial relationships'
                  }.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};