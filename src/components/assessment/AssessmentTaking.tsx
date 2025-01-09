import React, { useState } from 'react';
import { Question } from '../../types';
import { QuestionCard } from './QuestionCard';
import { Button } from '../ui/Button';
import { CandidateInfo } from './CandidateInfo';
import { useAssessmentStore } from '../../store/assessmentStore';

interface AssessmentTakingProps {
  questions: Question[];
  onComplete: (answers: Record<string, string | string[]>) => void;
}

export const AssessmentTaking: React.FC<AssessmentTakingProps> = ({
  questions,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 indicates candidate info collection
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [candidateInfo, setCandidateInfo] = useState<{ fullName: string; position: string } | null>(null);
  const { addResult } = useAssessmentStore();

  const handleCandidateInfoSubmit = (info: { fullName: string; position: string }) => {
    setCandidateInfo(info);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const result = {
        candidateInfo,
        answers,
        completedAt: new Date().toISOString(),
      };
      onComplete(answers);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (currentQuestionIndex === -1) {
    return <CandidateInfo onSubmit={handleCandidateInfoSubmit} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="text-sm text-gray-500">
            Progress: {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        currentAnswer={answers[currentQuestion.id]}
      />

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          variant="primary"
        >
          {isLastQuestion ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};