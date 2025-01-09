import { useState, useCallback } from 'react';
import { Question, Result } from '../types';
import { calculateScore } from '../utils/score';

export const useAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => prev + 1);
  }, []);

  const calculateResult = useCallback((userId: string, assessmentId: string): Result => {
    return {
      userId,
      assessmentId,
      score: calculateScore(answers),
      completedAt: new Date().toISOString(),
      answers
    };
  }, [answers]);

  return {
    currentQuestionIndex,
    answers,
    handleAnswer,
    nextQuestion,
    calculateResult
  };
};