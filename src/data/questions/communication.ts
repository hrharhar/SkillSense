import { Question } from '../../types';

export const communicationQuestions: Question[] = [
  {
    id: 'com-1',
    type: 'multiple-choice',
    prompt: 'Which response is most appropriate for a colleague who disagrees with your project approach?',
    options: [
      'Ignore their concerns and proceed with your plan',
      'Listen to their perspective and discuss potential compromises',
      'Escalate the disagreement to management immediately',
      'Tell them they\'re wrong and explain why'
    ],
    correctAnswer: 'Listen to their perspective and discuss potential compromises'
  },
  {
    id: 'com-2',
    type: 'multiple-choice',
    prompt: 'What is the most effective way to communicate a complex technical issue to a non-technical stakeholder?',
    options: [
      'Use technical jargon to sound professional',
      'Provide detailed technical specifications',
      'Use analogies and simple examples to explain concepts',
      'Send a lengthy email with all technical details'
    ],
    correctAnswer: 'Use analogies and simple examples to explain concepts'
  },
  {
    id: 'com-3',
    type: 'multiple-choice',
    prompt: 'Which approach is best when delivering negative feedback?',
    options: [
      'Be direct and harsh to make the point clear',
      'Avoid giving negative feedback altogether',
      'Provide specific examples and constructive suggestions for improvement',
      'Send feedback anonymously'
    ],
    correctAnswer: 'Provide specific examples and constructive suggestions for improvement'
  },
  {
    id: 'com-4',
    type: 'multiple-choice',
    prompt: 'What is the most appropriate way to handle a misunderstanding in an email thread?',
    options: [
      'Ignore it and hope it resolves itself',
      'Schedule a meeting or call to clarify the confusion',
      'Continue the email thread with longer explanations',
      'Complain to other colleagues about the confusion'
    ],
    correctAnswer: 'Schedule a meeting or call to clarify the confusion'
  },
  {
    id: 'com-5',
    type: 'multiple-choice',
    prompt: 'Which statement best demonstrates active listening?',
    options: [
      'Waiting for your turn to speak',
      'Interrupting to share your opinion',
      'Summarizing what was said and asking clarifying questions',
      'Nodding while thinking about other things'
    ],
    correctAnswer: 'Summarizing what was said and asking clarifying questions'
  },
  {
    id: 'com-6',
    type: 'multiple-choice',
    prompt: 'What is the most effective way to start a presentation to a new audience?',
    options: [
      'Jump straight into technical details',
      'Start with a joke, regardless of context',
      'Establish context and explain why the topic matters to the audience',
      'Begin with your complete biographical information'
    ],
    correctAnswer: 'Establish context and explain why the topic matters to the audience'
  }
];