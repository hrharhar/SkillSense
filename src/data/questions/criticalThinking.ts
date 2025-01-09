import { Question } from '../../types';

export const criticalThinkingQuestions: Question[] = [
  {
    id: 'ct-1',
    type: 'multiple-choice',
    prompt: 'Which statement represents the most logical conclusion from: "All successful companies invest in employee training. Company X invests in employee training."?',
    options: [
      'Company X is definitely successful',
      'Company X might be successful',
      'Company X is not successful',
      'No conclusion can be drawn about Company X\'s success'
    ],
    correctAnswer: 'No conclusion can be drawn about Company X\'s success'
  },
  {
    id: 'ct-2',
    type: 'multiple-choice',
    prompt: 'What is the main flaw in this argument: "This software has never been hacked, therefore it is completely secure."?',
    options: [
      'Past performance doesn\'t guarantee future results',
      'The software might be expensive',
      'The software might be slow',
      'Other software might be better'
    ],
    correctAnswer: 'Past performance doesn\'t guarantee future results'
  },
  {
    id: 'ct-3',
    type: 'multiple-choice',
    prompt: 'In a study, people who exercise regularly live longer. Which conclusion is most valid?',
    options: [
      'Exercise is the only factor in longevity',
      'Exercise might be one of several factors affecting longevity',
      'Everyone should exercise to live longer',
      'Not exercising leads to early death'
    ],
    correctAnswer: 'Exercise might be one of several factors affecting longevity'
  },
  {
    id: 'ct-4',
    type: 'multiple-choice',
    prompt: 'Which scenario best demonstrates circular reasoning?',
    options: [
      'The project will succeed because we have a good plan',
      'The plan is good because it will lead to success, and we know it will lead to success because it\'s a good plan',
      'We should follow the plan to achieve success',
      'Good plans often lead to successful projects'
    ],
    correctAnswer: 'The plan is good because it will lead to success, and we know it will lead to success because it\'s a good plan'
  },
  {
    id: 'ct-5',
    type: 'multiple-choice',
    prompt: 'Which approach demonstrates the strongest critical thinking in problem-solving?',
    options: [
      'Following intuition based on past experiences',
      'Implementing the first solution that comes to mind',
      'Analyzing multiple solutions and their potential consequences before deciding',
      'Asking others for their opinions and following the majority'
    ],
    correctAnswer: 'Analyzing multiple solutions and their potential consequences before deciding'
  },
  {
    id: 'ct-6',
    type: 'multiple-choice',
    prompt: 'What is the best way to evaluate the credibility of a source?',
    options: [
      'Accept it if it agrees with your existing beliefs',
      'Check its popularity and number of followers',
      'Verify its credentials, methodology, and potential biases',
      'Look at how well-designed its website is'
    ],
    correctAnswer: 'Verify its credentials, methodology, and potential biases'
  }
];