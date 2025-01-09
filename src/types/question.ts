export interface Question {
  id: string;
  type: 'multiple-choice' | 'open-ended' | 'drag-drop';
  prompt: string;
  options?: string[];
  correctAnswer?: string | string[];
}