import { Result } from '../types';
import { CATEGORIES } from '../constants/categories';
import { allQuestions } from '../data/questions';
import { calculateCategoryScore } from './scoreCalculations';

export interface TrendData {
  date: string;
  averageScore: number;
  totalCandidates: number;
  categoryAverages: Record<string, number>;
}

export interface PerformanceMetrics {
  totalAssessments: number;
  averageScore: number;
  categoryMetrics: CategoryMetrics[];
  trends: TrendData[];
}

export interface CategoryMetrics {
  name: string;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  distribution: {
    excellent: number;
    good: number;
    needsImprovement: number;
  };
}

export const generatePerformanceMetrics = (results: Result[]): PerformanceMetrics => {
  if (results.length === 0) {
    return {
      totalAssessments: 0,
      averageScore: 0,
      categoryMetrics: CATEGORIES.map(category => ({
        name: category.name,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        distribution: {
          excellent: 0,
          good: 0,
          needsImprovement: 0
        }
      })),
      trends: []
    };
  }

  // Calculate overall metrics
  const totalAssessments = results.length;
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const averageScore = Math.round(totalScore / totalAssessments);

  // Calculate category metrics
  const categoryMetrics = CATEGORIES.map(category => {
    const categoryScores = results.map(result => {
      const startIndex = category.startIndex;
      const categoryQuestions = allQuestions.slice(startIndex, startIndex + 6);
      let correct = 0;
      
      categoryQuestions.forEach(question => {
        if (result.answers[question.id] === question.correctAnswer) {
          correct++;
        }
      });

      return Math.round((correct / 6) * 100);
    });

    const validScores = categoryScores.filter(score => !isNaN(score));
    const avgScore = Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
    const maxScore = Math.max(...validScores);
    const minScore = Math.min(...validScores);

    return {
      name: category.name,
      averageScore: avgScore || 0,
      highestScore: maxScore || 0,
      lowestScore: minScore || 0,
      distribution: {
        excellent: validScores.filter(score => score >= 80).length,
        good: validScores.filter(score => score >= 60 && score < 80).length,
        needsImprovement: validScores.filter(score => score < 60).length
      }
    };
  });

  // Calculate trends (last 30 days)
  const trends = generateTrendData(results);

  return {
    totalAssessments,
    averageScore,
    categoryMetrics,
    trends
  };
};

const generateTrendData = (results: Result[]): TrendData[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Group results by date
  const resultsByDate = results
    .filter(r => new Date(r.completedAt) >= thirtyDaysAgo)
    .reduce((acc, result) => {
      const date = new Date(result.completedAt).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(result);
      return acc;
    }, {} as Record<string, Result[]>);

  // Generate trend data for each date
  const trendData = Object.entries(resultsByDate).map(([date, dateResults]) => {
    const totalScore = dateResults.reduce((sum, r) => sum + r.score, 0);
    const averageScore = Math.round(totalScore / dateResults.length);

    const categoryAverages = CATEGORIES.reduce((acc, category) => {
      const scores = dateResults.map(result => {
        const startIndex = category.startIndex;
        const categoryQuestions = allQuestions.slice(startIndex, startIndex + 6);
        let correct = 0;
        
        categoryQuestions.forEach(question => {
          if (result.answers[question.id] === question.correctAnswer) {
            correct++;
          }
        });

        return Math.round((correct / 6) * 100);
      });

      const validScores = scores.filter(score => !isNaN(score));
      acc[category.name] = validScores.length > 0 
        ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length)
        : 0;
      return acc;
    }, {} as Record<string, number>);

    return {
      date,
      averageScore,
      totalCandidates: dateResults.length,
      categoryAverages
    };
  });

  return trendData.sort((a, b) => a.date.localeCompare(b.date));
};