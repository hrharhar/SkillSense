import { Question } from '../../types';

export const allQuestions: Question[] = [
  // Problem Solving Questions
  {
    id: 'ps1',
    type: 'multiple-choice',
    prompt: 'If a train leaves the station at 8:00 AM traveling at 60 miles per hour, how far will it have traveled by 11:00 AM?',
    options: ['120 miles', '180 miles', '240 miles', '300 miles'],
    correctAnswer: '180 miles'
  },
  {
    id: 'ps2',
    type: 'multiple-choice',
    prompt: 'You buy 3 apples for $0.75 each and pay with a $5 bill. How much change should you receive?',
    options: ['$2.75', '$3.25', '$3.75', '$4.25'],
    correctAnswer: '$2.75'
  },
  {
    id: 'ps3',
    type: 'multiple-choice',
    prompt: 'A bookstore sells notebooks at $2 each or 3 for $5. How much would it cost to buy 9 notebooks using the best possible deal?',
    options: ['$15', '$16', '$17', '$18'],
    correctAnswer: '$15'
  },
  {
    id: 'ps4',
    type: 'multiple-choice',
    prompt: 'If a rectangle has a length of 10 units and a width of 5 units, what is the area of the rectangle?',
    options: ['15 square units', '30 square units', '50 square units', '100 square units'],
    correctAnswer: '50 square units'
  },
  {
    id: 'ps5',
    type: 'multiple-choice',
    prompt: 'A car rental company charges $50 per day plus $0.20 per mile driven. If you rent a car for 3 days and drive 150 miles, what is the total cost?',
    options: ['$150', '$165', '$175', '$180'],
    correctAnswer: '$180'
  },
  {
    id: 'ps6',
    type: 'multiple-choice',
    prompt: 'You have 8 oranges and give half of them to a friend, then buy 6 more. How many oranges do you have now?',
    options: ['6', '8', '10', '14'],
    correctAnswer: '10'
  },

  // Critical Thinking Questions
  {
    id: 'ct1',
    type: 'multiple-choice',
    prompt: 'Which of the following is the most logical conclusion based on the statement: "All the students in the class are wearing blue shirts. John is in the class."',
    options: [
      'John is not wearing a blue shirt',
      'John is wearing a blue shirt',
      'John is the teacher',
      'John forgot his blue shirt'
    ],
    correctAnswer: 'John is wearing a blue shirt'
  },
  {
    id: 'ct2',
    type: 'multiple-choice',
    prompt: 'If some A are B, and all B are C, which of the following is true?',
    options: [
      'Some A are not C',
      'All A are C',
      'Some A are C',
      'No A are C'
    ],
    correctAnswer: 'Some A are C'
  },
  {
    id: 'ct3',
    type: 'multiple-choice',
    prompt: 'A man says, "The more you take, the more you leave behind." What is he referring to?',
    options: ['Steps', 'Time', 'Money', 'Memories'],
    correctAnswer: 'Steps'
  },
  {
    id: 'ct4',
    type: 'multiple-choice',
    prompt: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['5 minutes', '100 minutes', '20 minutes', '10 minutes'],
    correctAnswer: '5 minutes'
  },
  {
    id: 'ct5',
    type: 'multiple-choice',
    prompt: 'Which of the following scenarios best illustrates the concept of opportunity cost?',
    options: [
      'Choosing to study for an exam instead of going to a movie',
      'Buying a cheaper brand to save money',
      'Working overtime to earn extra pay',
      'Saving money in a bank account'
    ],
    correctAnswer: 'Choosing to study for an exam instead of going to a movie'
  },
  {
    id: 'ct6',
    type: 'multiple-choice',
    prompt: 'If a plane crashes on the border of two countries, where should the survivors be buried?',
    options: [
      'In the country they were traveling to',
      'In the country they were traveling from',
      'In the country with fewer regulations',
      'Nowhere; survivors are not buried'
    ],
    correctAnswer: 'Nowhere; survivors are not buried'
  },

  // Communication Questions
  {
    id: 'com1',
    type: 'multiple-choice',
    prompt: 'Choose the sentence that is grammatically correct.',
    options: [
      'He don\'t know nothing about the problem',
      'He doesn\'t know anything about the problem',
      'He didn\'t know nothing about the problem',
      'He does not know nothing about the problem'
    ],
    correctAnswer: 'He doesn\'t know anything about the problem'
  },
  {
    id: 'com2',
    type: 'multiple-choice',
    prompt: 'Which of the following sentences best conveys a formal tone?',
    options: [
      'Can\'t wait to see you at the meeting!',
      'Looking forward to seeing you at the meeting',
      'See you at the meeting!',
      'Meeting\'s gonna be lit!'
    ],
    correctAnswer: 'Looking forward to seeing you at the meeting'
  },
  {
    id: 'com3',
    type: 'multiple-choice',
    prompt: 'In a business email, which of the following is the most appropriate closing?',
    options: ['Later!', 'Best regards,', 'See ya,', 'Cheers!'],
    correctAnswer: 'Best regards,'
  },
  {
    id: 'com4',
    type: 'multiple-choice',
    prompt: 'Which sentence uses the correct form of "their," "there," or "they\'re"?',
    options: [
      'They\'re going to bring their books over there',
      'There going to bring there books over they\'re',
      'Their going to bring they\'re books over there',
      'There going to bring their books over they\'re'
    ],
    correctAnswer: 'They\'re going to bring their books over there'
  },
  {
    id: 'com5',
    type: 'multiple-choice',
    prompt: 'Which of the following best summarizes the main point of the passage: "Effective communication is essential in the workplace. It leads to better understanding, less confusion, and increased productivity among team members."',
    options: [
      'Communication causes confusion in the workplace',
      'Effective communication improves workplace productivity',
      'Team members do not understand each other',
      'Productivity is not related to communication'
    ],
    correctAnswer: 'Effective communication improves workplace productivity'
  },
  {
    id: 'com6',
    type: 'multiple-choice',
    prompt: 'Which of the following is the most appropriate response to a customer\'s complaint about a delayed order?',
    options: [
      'It\'s not our fault; please be patient',
      'We apologize for the delay and are working to resolve the issue',
      'You\'ll get it when you get it',
      'Why are you complaining?'
    ],
    correctAnswer: 'We apologize for the delay and are working to resolve the issue'
  },

  // Understanding Instructions Questions
  {
    id: 'ui1',
    type: 'multiple-choice',
    prompt: 'If a recipe calls for 2 cups of sugar for every 5 cups of flour, how much sugar is needed for 15 cups of flour?',
    options: ['4 cups', '5 cups', '6 cups', '8 cups'],
    correctAnswer: '6 cups'
  },
  {
    id: 'ui2',
    type: 'multiple-choice',
    prompt: 'The manual states: "Press the red button to start, then wait for the green light before proceeding." What should you do first?',
    options: [
      'Press the red button',
      'Press the green button',
      'Wait for the green light',
      'Proceed without pressing any buttons'
    ],
    correctAnswer: 'Press the red button'
  },
  {
    id: 'ui3',
    type: 'multiple-choice',
    prompt: 'If the instructions say to assemble parts A and B before attaching part C, which step should you perform first?',
    options: [
      'Attach part C',
      'Assemble parts A and B',
      'Attach part A',
      'Attach part B'
    ],
    correctAnswer: 'Assemble parts A and B'
  },
  {
    id: 'ui4',
    type: 'multiple-choice',
    prompt: 'According to the following directions, what is the second turn you should make? "From the starting point, go north for 2 miles, turn right at the gas station, continue for 1 mile, then turn left at the bank."',
    options: [
      'Turn right at the gas station',
      'Turn left at the bank',
      'Go north for 2 miles',
      'Continue for 1 mile'
    ],
    correctAnswer: 'Turn left at the bank'
  },
  {
    id: 'ui5',
    type: 'multiple-choice',
    prompt: 'If an email instructs you to "Please submit your report by EOD Friday," by when should you submit your report?',
    options: [
      'End of day Thursday',
      'End of day Friday',
      'Beginning of day Friday',
      'End of day Saturday'
    ],
    correctAnswer: 'End of day Friday'
  },
  {
    id: 'ui6',
    type: 'multiple-choice',
    prompt: 'The instructions state: "For safety, disconnect the power supply before opening the device." What is the primary reason for this instruction?',
    options: [
      'To prevent data loss',
      'To avoid electric shock',
      'To save energy',
      'To speed up the repair process'
    ],
    correctAnswer: 'To avoid electric shock'
  },

  // Spatial Reasoning Questions
  {
    id: 'sr1',
    type: 'multiple-choice',
    prompt: 'Imagine folding a piece of paper in half three times. How many layers thick is the paper now?',
    options: ['6 layers', '8 layers', '9 layers', '12 layers'],
    correctAnswer: '8 layers'
  },
  {
    id: 'sr2',
    type: 'multiple-choice',
    prompt: 'Which shape can be made by folding this net: a cross-shaped net consisting of six equal squares connected edge to edge in a cross shape?',
    options: ['Cube', 'Pyramid', 'Cylinder', 'Sphere'],
    correctAnswer: 'Cube'
  },
  {
    id: 'sr3',
    type: 'multiple-choice',
    prompt: 'If you are facing north and turn 90 degrees to your right, then 180 degrees to your left, which direction are you now facing?',
    options: ['South', 'East', 'West', 'North'],
    correctAnswer: 'West'
  },
  {
    id: 'sr4',
    type: 'multiple-choice',
    prompt: 'Which shape is different from the others?',
    options: ['Square', 'Cube', 'Rectangle', 'Triangle'],
    correctAnswer: 'Cube'
  },
  {
    id: 'sr5',
    type: 'multiple-choice',
    prompt: 'If two sides of a right-angled triangle are 3 units and 4 units, what is the length of the hypotenuse?',
    options: ['5 units', '6 units', '7 units', '8 units'],
    correctAnswer: '5 units'
  },
  {
    id: 'sr6',
    type: 'multiple-choice',
    prompt: 'What letter comes next in the sequence: A, D, G, J, ___?',
    options: ['K', 'M', 'N', 'P'],
    correctAnswer: 'M'
  }
];