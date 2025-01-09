import { Brain, MessageSquare, Lightbulb, ClipboardCheck, Box } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    icon: Brain,
    startIndex: 0
  },
  {
    id: 'critical-thinking',
    name: 'Critical Thinking',
    icon: Lightbulb,
    startIndex: 6
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: MessageSquare,
    startIndex: 12
  },
  {
    id: 'understanding-instructions',
    name: 'Understanding Instructions',
    icon: ClipboardCheck,
    startIndex: 18
  },
  {
    id: 'spatial-reasoning',
    name: 'Spatial Reasoning',
    icon: Box,
    startIndex: 24
  }
] as const;