import { Result } from '../types';
import { allQuestions } from '../data/questions';

export interface CategoryInsight {
  name: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  feedback: string;
}

export interface AssessmentInsight {
  overallScore: number;
  overallFeedback: string;
  categories: CategoryInsight[];
  completedAt: string;
}

export const generateAssessmentInsights = (result: Result): AssessmentInsight => {
  const categories = [
    { name: 'Problem Solving', startIndex: 0 },
    { name: 'Critical Thinking', startIndex: 6 },
    { name: 'Communication', startIndex: 12 },
    { name: 'Understanding Instructions', startIndex: 18 },
    { name: 'Spatial Reasoning', startIndex: 24 }
  ];

  const categoryInsights = categories.map(category => {
    const categoryQuestions = allQuestions.slice(category.startIndex, category.startIndex + 6);
    let correctCount = 0;

    categoryQuestions.forEach(question => {
      if (result.answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / 6) * 100);
    const feedback = getCategoryFeedback(category.name, score);

    return {
      name: category.name,
      score,
      correctCount,
      totalQuestions: 6,
      feedback
    };
  });

  return {
    overallScore: result.score,
    overallFeedback: getOverallAssessment(result.score),
    categories: categoryInsights,
    completedAt: result.completedAt
  };
};

const getCategoryFeedback = (category: string, score: number): string => {
  const feedbacks = {
    'Problem Solving': {
      excellent: "Outstanding problem-solving skills! You have demonstrated a strong ability to analyze situations, apply logic, and find effective solutions. This skill is crucial for tackling challenges and making informed decisions in any role.",
      good: "Good problem-solving abilities. You can effectively analyze situations and find solutions, though there's room for sharpening your skills further. Enhancing this skill can help you tackle complex problems more efficiently.",
      fair: "Fair problem-solving skills. You show some ability to address problems but may face challenges in consistently finding effective solutions. Focusing on developing analytical thinking could improve your problem-solving capabilities.",
      needsImprovement: "There is room for improvement in your problem-solving skills. You may find it challenging to analyze problems and identify solutions. Developing strategies for logical thinking and practicing problem-solving scenarios could be beneficial."
    },
    'Critical Thinking': {
      excellent: "Excellent critical thinking skills! You have a strong ability to analyze information objectively, evaluate arguments, and make logical conclusions. This skill is essential for making sound judgments and decisions.",
      good: "Good critical thinking abilities. You can analyze and evaluate information effectively, though there may be opportunities to deepen your analytical skills further. Enhancing this skill can improve decision-making processes.",
      fair: "Fair critical thinking skills. You have some ability to assess information critically but may sometimes overlook important details or nuances. Focusing on improving analytical reasoning can enhance your critical thinking.",
      needsImprovement: "Your critical thinking skills could benefit from development. You may find it challenging to evaluate information objectively or draw logical conclusions. Engaging in activities that promote analytical thinking can help strengthen this area."
    },
    'Communication': {
      excellent: "Outstanding communication skills! You demonstrate a strong command of language, an ability to convey messages clearly, and appropriate use of tone and style. Effective communication is key in any professional setting.",
      good: "Good communication abilities. You can express ideas clearly and appropriately, though there may be areas for refinement. Enhancing your communication skills can lead to even more effective interactions.",
      fair: "Fair communication skills. You are able to convey messages but may sometimes struggle with clarity or appropriateness. Focusing on improving grammar, tone, and clarity can enhance your communication.",
      needsImprovement: "Your communication skills may need improvement. There may be challenges in conveying messages clearly or using appropriate language. Developing your language skills and practicing effective communication techniques can be beneficial."
    },
    'Understanding Instructions': {
      excellent: "Excellent ability to understand and follow instructions! You accurately interpret directives and carry out tasks as specified. This skill ensures efficiency and reduces errors in the workplace.",
      good: "Good at understanding instructions. You generally interpret and follow directions well, though there may be occasional misunderstandings. Paying close attention to details can further improve this skill.",
      fair: "Fair ability to understand instructions. You may sometimes misinterpret directives or overlook details. Enhancing your attention to detail and clarification skills can help improve your performance in this area.",
      needsImprovement: "There is room for improvement in understanding instructions. Misinterpretation of directives may lead to errors or inefficiencies. Focusing on carefully reading instructions and seeking clarification when needed can be beneficial."
    },
    'Spatial Reasoning': {
      excellent: "Outstanding spatial reasoning skills! You have a strong ability to visualize and manipulate objects mentally, which is valuable in tasks involving design, planning, and problem-solving.",
      good: "Good spatial reasoning abilities. You can visualize spatial relationships effectively, though there may be room for further development. Enhancing this skill can improve your performance in tasks requiring spatial awareness.",
      fair: "Fair spatial reasoning skills. You have some ability to perceive spatial relationships but may find complex spatial tasks challenging. Practice with spatial puzzles and visualization techniques can help improve this area.",
      needsImprovement: "Spatial reasoning may be a challenging area for you. Difficulties in visualizing spatial relationships can impact tasks that require this skill. Engaging in activities that promote spatial awareness can be beneficial."
    }
  };

  const getFeedbackLevel = (score: number) => {
    if (score >= 83) return 'excellent';
    if (score >= 67) return 'good';
    if (score >= 50) return 'fair';
    return 'needsImprovement';
  };

  const categoryFeedback = feedbacks[category as keyof typeof feedbacks];
  return categoryFeedback[getFeedbackLevel(score)];
};

const getOverallAssessment = (score: number): string => {
  if (score >= 90) {
    return "Outstanding performance on the assessment! Your results indicate exceptional abilities across all tested areas. You demonstrate remarkable problem-solving, critical thinking, communication, understanding of instructions, and spatial reasoning skills. These competencies are invaluable assets in any professional role.";
  } else if (score >= 80) {
    return "Excellent performance on the assessment! Your results show strong capabilities in most areas. While you demonstrate solid skills overall, there may be specific areas where focused development could enhance your already impressive skill set.";
  } else if (score >= 70) {
    return "Good performance on the assessment! You have demonstrated solid skills in several key areas. While your abilities are strong, there are opportunities to further develop certain skills to achieve even greater proficiency.";
  } else if (score >= 60) {
    return "Fair performance on the assessment. Your results show that you have foundational skills in most areas, with some strengths and areas for improvement. Focusing on developing specific skills can enhance your overall performance.";
  } else {
    return "The assessment indicates several areas where improvement would be beneficial. Enhancing your skills in problem-solving, critical thinking, communication, understanding instructions, and spatial reasoning can contribute to better performance in professional settings. Consider focusing on the areas where you scored lowest first.";
  }
};