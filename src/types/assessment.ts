import { Question } from './question';

export type AssessmentType = 'PROBLEM_SOLVING' | 'CRITICAL_THINKING' | 'COMMUNICATION' | 'INSTRUCTIONS' | 'SPATIAL';

export interface Assessment {
  id: string;
  title: string;
  type: AssessmentType;
  description: string;
  questions: Question[];
  timeLimit: number;
}

export interface Result {
  userId: string;
  assessmentId: string;
  score: number;
  completedAt: string;
  timeSpent?: number;
  answers: Record<string, string | string[]>;
}

export interface CategoryScore {
  category: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  feedback: string;
}