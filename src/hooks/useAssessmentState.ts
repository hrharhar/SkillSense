import { useState, useCallback } from 'react';
import { Question, Result } from '../types';
import { useTimerStore } from '../store/timerStore';
import { allQuestions } from '../data/questions';

export const useAssessmentState = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { timeLeft, endTimer } = useTimerStore();

  const handleAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => Math.min(prev + 1, allQuestions.length - 1));
  }, []);

  const previousQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const startReview = useCallback(() => {
    setIsReviewing(true);
  }, []);

  const backToQuestions = useCallback(() => {
    setIsReviewing(false);
  }, []);

  const calculateResult = useCallback((userId: string, assessmentId: string, timeSpent: number): Result => {
    endTimer();
    let correct = 0;
    allQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    return {
      userId,
      assessmentId,
      score: Math.round((correct / allQuestions.length) * 100),
      completedAt: new Date().toISOString(),
      timeSpent,
      answers
    };
  }, [answers, endTimer]);

  return {
    currentQuestionIndex,
    answers,
    isReviewing,
    isSubmitting,
    error,
    handleAnswer,
    nextQuestion,
    previousQuestion,
    startReview,
    backToQuestions,
    calculateResult,
    setIsSubmitting,
    setError,
    setCurrentQuestionIndex
  };
};