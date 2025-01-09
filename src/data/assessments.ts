import { Assessment, AssessmentType } from '../types';
import { problemSolvingQuestions } from './questions/problemSolving';
import { criticalThinkingQuestions } from './questions/criticalThinking';
import { communicationQuestions } from './questions/communication';
import { instructionsQuestions } from './questions/instructions';
import { spatialReasoningQuestions } from './questions/spatialReasoning';

export const assessments: Assessment[] = [
  {
    id: 'assessment-1',
    title: 'Problem-Solving Skills',
    type: 'PROBLEM_SOLVING',
    description: 'Test your analytical and problem-solving abilities through practical scenarios.',
    questions: problemSolvingQuestions,
    timeLimit: 30
  },
  {
    id: 'assessment-2',
    title: 'Critical Thinking',
    type: 'CRITICAL_THINKING',
    description: 'Evaluate your ability to analyze situations and make reasoned judgments.',
    questions: criticalThinkingQuestions,
    timeLimit: 25
  },
  {
    id: 'assessment-3',
    title: 'Communication Skills',
    type: 'COMMUNICATION',
    description: 'Assess your written communication and explanation abilities.',
    questions: communicationQuestions,
    timeLimit: 20
  },
  {
    id: 'assessment-4',
    title: 'Following Instructions',
    type: 'INSTRUCTIONS',
    description: 'Test your ability to understand and follow sequential instructions.',
    questions: instructionsQuestions,
    timeLimit: 15
  },
  {
    id: 'assessment-5',
    title: 'Spatial Reasoning',
    type: 'SPATIAL',
    description: 'Challenge your ability to visualize and manipulate shapes and patterns.',
    questions: spatialReasoningQuestions,
    timeLimit: 20
  }
];