import React from 'react';
import { Question } from '../../types';
import { Button } from '../ui/Button';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReviewAnswersProps {
  questions: Question[];
  answers: Record<string, string>;
  onBack: () => void;
  onSubmit: () => void;
}

export const ReviewAnswers: React.FC<ReviewAnswersProps> = ({
  questions,
  answers,
  onBack,
  onSubmit
}) => {
  const answeredQuestions = questions.filter(q => answers[q.id]).length;
  const unansweredQuestions = questions.length - answeredQuestions;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Questions
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          className="flex items-center gap-2 px-6"
        >
          Submit Assessment
        </Button>
      </div>

      <div className={`bg-white rounded-xl shadow-sm p-6 mb-6 ${
        unansweredQuestions > 0 ? 'border-2 border-yellow-200 bg-yellow-50' : ''
      }`}>
        <div className="flex items-start gap-3">
          {unansweredQuestions > 0 ? (
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          )}
          <div>
            <h2 className="text-xl font-semibold mb-2">Review Your Answers</h2>
            <p className="text-gray-600">
              {unansweredQuestions > 0
                ? `You have ${unansweredQuestions} unanswered ${unansweredQuestions === 1 ? 'question' : 'questions'}. Please complete all questions before submitting.`
                : "All questions have been answered. Please review your answers before submitting."
              }
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const hasAnswer = !!answers[question.id];
          
          return (
            <div 
              key={question.id} 
              className={`bg-white rounded-xl shadow-sm p-6 ${!hasAnswer ? 'border-2 border-red-200' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  ${hasAnswer ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  <span className={`font-semibold ${hasAnswer ? 'text-green-700' : 'text-red-700'}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {question.prompt}
                  </h3>
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <div
                        key={option}
                        className={`p-3 rounded-lg flex items-center justify-between ${
                          answers[question.id] === option
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <span className="text-gray-700">{option}</span>
                        {answers[question.id] === option && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                  {!hasAnswer && (
                    <div className="mt-3 flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm">This question needs to be answered</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};