import { Result } from '../types';
import { allQuestions } from '../data/questions';

export const calculateCategoryScore = (answers: Record<string, string>, startIndex: number): number => {
  let correct = 0;
  const categoryQuestions = allQuestions.slice(startIndex, startIndex + 6);
  
  categoryQuestions.forEach(question => {
    if (answers[question.id] === question.correctAnswer) {
      correct++;
    }
  });

  return Math.round((correct / 6) * 100);
};

export const calculateOverallScore = (answers: Record<string, string>): number => {
  let correct = 0;
  allQuestions.forEach(question => {
    if (answers[question.id] === question.correctAnswer) {
      correct++;
    }
  });

  return Math.round((correct / allQuestions.length) * 100);
};

export const getStatusStyle = (score: number) => {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  return 'needsImprovement';
};

export const getStatusText = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  return 'Needs Improvement';
};