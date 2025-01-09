import React from 'react';
import { CategoryScore } from '../types';
import { CATEGORIES } from '../constants/categories';
import { allQuestions } from '../data/questions';

export const getCategoryScores = (answers: Record<string, string>): CategoryScore[] => {
  return CATEGORIES.map(category => {
    const categoryQuestions = allQuestions.slice(category.startIndex, category.startIndex + 6);
    let correct = 0;

    categoryQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / 6) * 100);
    const icon = React.createElement(category.icon, { className: 'w-6 h-6' });

    return {
      category: category.name,
      score,
      icon,
      description: `${correct} out of 6 questions answered correctly`,
      feedback: getCategoryFeedback(category.name, score)
    };
  });
};

export const getScoreColor = (score: number): string => {
  if (score >= 83) return 'text-green-600';
  if (score >= 67) return 'text-blue-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const getCategoryFeedback = (category: string, score: number): string => {
  if (score >= 80) {
    return `Excellent performance in ${category}. You've demonstrated strong competency in this area.`;
  } else if (score >= 60) {
    return `Good understanding of ${category}. There's room for some improvement.`;
  } else {
    return `This area needs attention. Consider focusing on improving your ${category} skills.`;
  }
};