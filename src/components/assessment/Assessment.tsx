import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CandidateInfo } from './CandidateInfo';
import { QuestionCard } from './QuestionCard';
import { QuestionNavigation } from './QuestionNavigation';
import { Timer } from './Timer';
import { QuestionProgress } from './QuestionProgress';
import { useAssessmentStore } from '../../store/assessmentStore';
import { useTimerStore } from '../../store/timerStore';
import { useAssessmentState } from '../../hooks/useAssessmentState';
import { allQuestions } from '../../data/questions';
import { AssessmentResults } from '../results/AssessmentResults';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

export const Assessment: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidateInfo, setCandidateInfo] = useState<{ fullName: string; position: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const { addResult } = useAssessmentStore();
  const { timeLeft, startTime } = useTimerStore();

  const {
    currentQuestionIndex,
    answers,
    isSubmitting,
    error,
    handleAnswer,
    nextQuestion,
    previousQuestion,
    calculateResult,
    setIsSubmitting,
    setError,
    setCurrentQuestionIndex
  } = useAssessmentState();

  const handleTimeUp = () => {
    if (candidateInfo && !isCompleted) {
      handleComplete();
    }
  };

  const handleCandidateInfoSubmit = (info: { fullName: string; position: string }) => {
    setCandidateInfo(info);
    setCurrentQuestionIndex(0);
    setSearchParams({ started: 'true' });
  };

  const handleComplete = async () => {
    if (!candidateInfo) return;

    try {
      setIsSubmitting(true);
      const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      const resultData = calculateResult(candidateInfo.fullName, candidateInfo.position, timeSpent);
      await addResult(resultData);
      setResult(resultData);
      setIsCompleted(true);
      setSearchParams({});
    } catch (err) {
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowConfirmSubmit(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      const unansweredCount = allQuestions.filter(q => !answers[q.id]).length;
      if (unansweredCount > 0) {
        setError(`Please answer all questions before submitting. You have ${unansweredCount} unanswered questions.`);
        return;
      }
      setShowConfirmSubmit(true);
    } else {
      nextQuestion();
    }
  };

  if (currentQuestionIndex === -1) {
    return <CandidateInfo onSubmit={handleCandidateInfoSubmit} />;
  }

  if (isCompleted && candidateInfo && result) {
    return <AssessmentResults result={result} candidateInfo={candidateInfo} />;
  }

  if (isSubmitting) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Submitting your assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => setError(null)}
          className="w-full"
        >
          Continue Assessment
        </Button>
      </div>
    );
  }

  const currentQuestion = allQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Question {currentQuestionIndex + 1} of {allQuestions.length}
              </h2>
              <p className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </p>
            </div>
            <Timer duration={45} onTimeUp={handleTimeUp} />
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          currentAnswer={answers[currentQuestion.id]}
        />

        <QuestionNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={allQuestions.length}
          onPrevious={previousQuestion}
          onNext={handleNext}
          hasAnswer={!!answers[currentQuestion.id]}
          isLastQuestion={isLastQuestion}
        />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Press <kbd className="px-2 py-1 bg-gray-100 border rounded-md">1-4</kbd> to select an answer, 
            <kbd className="px-2 py-1 bg-gray-100 border rounded-md ml-1">Enter</kbd> for next question
          </p>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmSubmit}
        onClose={() => setShowConfirmSubmit(false)}
        onConfirm={handleComplete}
        title="Submit Assessment"
        message="Are you sure you want to submit your assessment? You won't be able to change your answers after submission."
        confirmText="Yes, Submit Assessment"
        cancelText="No, I want to review my answers"
      />
    </>
  );
};