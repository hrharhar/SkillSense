import { Question } from '../../types';

export const problemSolvingQuestions: Question[] = [
  {
    id: 'ps-1',
    type: 'multiple-choice',
    prompt: 'A project team needs to complete 240 tasks. If 8 team members can complete it in 15 days, how many days would it take 12 team members?',
    options: ['5 days', '10 days', '12 days', '20 days'],
    correctAnswer: '10 days'
  },
  {
    id: 'ps-2',
    type: 'multiple-choice',
    prompt: 'In a sequence: 3, 7, 15, 31, 63, what comes next?',
    options: ['127', '95', '121', '111'],
    correctAnswer: '127'
  },
  {
    id: 'ps-3',
    type: 'multiple-choice',
    prompt: 'If it takes 6 machines 4 days to produce 100 items, how many days would it take 8 machines to produce the same amount?',
    options: ['2 days', '3 days', '5 days', '6 days'],
    correctAnswer: '3 days'
  },
  {
    id: 'ps-4',
    type: 'multiple-choice',
    prompt: 'A store offers a 20% discount, followed by an additional 15% off. What is the total percentage discount?',
    options: ['35%', '32%', '30%', '28%'],
    correctAnswer: '32%'
  },
  {
    id: 'ps-5',
    type: 'multiple-choice',
    prompt: 'If 5 workers can build a wall in 8 hours, how many workers are needed to build it in 4 hours?',
    options: ['8 workers', '10 workers', '12 workers', '15 workers'],
    correctAnswer: '10 workers'
  },
  {
    id: 'ps-6',
    type: 'multiple-choice',
    prompt: 'A car travels 240 miles at 60 mph, then returns at 40 mph. What is the average speed for the entire journey?',
    options: ['45 mph', '48 mph', '50 mph', '52 mph'],
    correctAnswer: '48 mph'
  }
];