import { Question } from '../../types';

export const instructionsQuestions: Question[] = [
  {
    id: 'inst-1',
    type: 'multiple-choice',
    prompt: 'Which sequence correctly describes the process of creating a new git branch and pushing changes?',
    options: [
      'git push, git branch, git commit, git checkout',
      'git branch, git checkout, git commit, git push',
      'git commit, git push, git branch, git checkout',
      'git checkout, git commit, git branch, git push'
    ],
    correctAnswer: 'git branch, git checkout, git commit, git push'
  },
  {
    id: 'inst-2',
    type: 'multiple-choice',
    prompt: 'What is the correct order for deploying a web application?',
    options: [
      'Deploy, Test, Build, Review',
      'Build, Test, Review, Deploy',
      'Test, Deploy, Build, Review',
      'Review, Build, Deploy, Test'
    ],
    correctAnswer: 'Build, Test, Review, Deploy'
  },
  {
    id: 'inst-3',
    type: 'multiple-choice',
    prompt: 'Which step sequence is correct for setting up a new development environment?',
    options: [
      'Install dependencies, Clone repository, Configure settings, Verify installation',
      'Configure settings, Install dependencies, Verify installation, Clone repository',
      'Clone repository, Install dependencies, Configure settings, Verify installation',
      'Verify installation, Clone repository, Configure settings, Install dependencies'
    ],
    correctAnswer: 'Clone repository, Install dependencies, Configure settings, Verify installation'
  },
  {
    id: 'inst-4',
    type: 'multiple-choice',
    prompt: 'What is the correct order for handling a customer support ticket?',
    options: [
      'Close ticket, Investigate issue, Respond to customer, Document solution',
      'Investigate issue, Respond to customer, Document solution, Close ticket',
      'Respond to customer, Close ticket, Investigate issue, Document solution',
      'Document solution, Investigate issue, Respond to customer, Close ticket'
    ],
    correctAnswer: 'Investigate issue, Respond to customer, Document solution, Close ticket'
  },
  {
    id: 'inst-5',
    type: 'multiple-choice',
    prompt: 'Which sequence is correct for conducting a code review?',
    options: [
      'Approve changes, Check functionality, Review code, Test changes',
      'Review code, Test changes, Check functionality, Approve changes',
      'Test changes, Approve changes, Review code, Check functionality',
      'Check functionality, Review code, Test changes, Approve changes'
    ],
    correctAnswer: 'Review code, Test changes, Check functionality, Approve changes'
  },
  {
    id: 'inst-6',
    type: 'multiple-choice',
    prompt: 'What is the correct order for implementing a new feature?',
    options: [
      'Write tests, Plan implementation, Write code, Review',
      'Plan implementation, Write tests, Write code, Review',
      'Write code, Write tests, Plan implementation, Review',
      'Review, Write code, Write tests, Plan implementation'
    ],
    correctAnswer: 'Plan implementation, Write tests, Write code, Review'
  }
];