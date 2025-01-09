import { Question } from '../../types';

export const spatialReasoningQuestions: Question[] = [
  {
    id: 'sp-1',
    type: 'multiple-choice',
    prompt: 'When a cube is unfolded, which shape represents its net?',
    options: [
      'Six squares in a straight line',
      'Six squares arranged in a cross shape',
      'Five squares arranged in a cross shape',
      'Four squares arranged in a square'
    ],
    correctAnswer: 'Six squares arranged in a cross shape'
  },
  {
    id: 'sp-2',
    type: 'multiple-choice',
    prompt: 'If you rotate a pyramid with a square base 90 degrees to the right, what shape will you see from the front?',
    options: [
      'A square',
      'A triangle',
      'A rectangle',
      'A pentagon'
    ],
    correctAnswer: 'A triangle'
  },
  {
    id: 'sp-3',
    type: 'multiple-choice',
    prompt: 'Which 3D shape can be created by rotating a rectangle around its long axis?',
    options: [
      'Sphere',
      'Cylinder',
      'Cone',
      'Cube'
    ],
    correctAnswer: 'Cylinder'
  },
  {
    id: 'sp-4',
    type: 'multiple-choice',
    prompt: 'When looking at a cube from the top, what shape do you see?',
    options: [
      'Circle',
      'Triangle',
      'Square',
      'Rectangle'
    ],
    correctAnswer: 'Square'
  },
  {
    id: 'sp-5',
    type: 'multiple-choice',
    prompt: 'If you slice a cone horizontally parallel to its base, what shape is the cross-section?',
    options: [
      'Triangle',
      'Square',
      'Rectangle',
      'Circle'
    ],
    correctAnswer: 'Circle'
  },
  {
    id: 'sp-6',
    type: 'multiple-choice',
    prompt: 'Which shape would you get if you connected the midpoints of a cube\'s faces?',
    options: [
      'Cube',
      'Octahedron',
      'Tetrahedron',
      'Dodecahedron'
    ],
    correctAnswer: 'Octahedron'
  }
];