import { AnalysisResult } from '../types';

const mockAnalysisResult: AnalysisResult = {
  jobTitle: 'Senior Full-Stack Developer',
  processingTime: 2850,
  skills: [
    { name: 'React.js', category: 'technical' },
    { name: 'Node.js', category: 'technical' },
    { name: 'TypeScript', category: 'technical' },
    { name: 'REST APIs', category: 'technical' },
    { name: 'Database Design', category: 'technical' },
    { name: 'Problem Solving', category: 'soft' },
    { name: 'Communication', category: 'soft' },
    { name: 'Team Collaboration', category: 'soft' },
    { name: 'Leadership', category: 'soft' },
    { name: 'Git', category: 'tool' },
    { name: 'Docker', category: 'tool' },
    { name: 'AWS', category: 'tool' },
    { name: 'Jira', category: 'tool' }
  ],
  complexityScore: {
    score: 8,
    maxScore: 10,
    explanation:
      'This role requires advanced technical expertise across multiple domains (frontend, backend, cloud infrastructure), leadership capabilities, and the ability to architect scalable solutions. The combination of deep technical skills and team leadership responsibilities places this role in the high complexity range.'
  },
  assessments: [
    {
      id: 'assess-1',
      type: 'Technical',
      title: 'Full-Stack Coding Challenge',
      description:
        'Live coding assessment covering React, Node.js, and database design. Candidates build a small feature end-to-end, demonstrating both frontend and backend proficiency.',
      duration: '90-120 minutes',
      stage: 'Interview',
      matchScore: 95
    },
    {
      id: 'assess-2',
      type: 'Cognitive',
      title: 'Logical Reasoning & Problem Solving',
      description:
        'Measures analytical thinking, pattern recognition, and problem-solving speed. Essential for senior roles requiring architectural decisions and complex debugging.',
      duration: '30-45 minutes',
      stage: 'Screening',
      matchScore: 88
    },
    {
      id: 'assess-3',
      type: 'Technical',
      title: 'System Design Interview',
      description:
        'Evaluates ability to design scalable architectures, make trade-off decisions, and communicate technical concepts. Critical for senior engineering roles.',
      duration: '60 minutes',
      stage: 'Interview',
      matchScore: 92
    },
    {
      id: 'assess-4',
      type: 'Behavioral',
      title: 'Leadership & Collaboration Assessment',
      description:
        'Structured interview assessing past experience in leading projects, mentoring team members, and handling conflict. Uses STAR methodology for reliable evaluation.',
      duration: '45 minutes',
      stage: 'Final',
      matchScore: 85
    }
  ]
};

export async function analyzeJobDescription(
  jobDescription: string
): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return mockAnalysisResult;
}

export function getMockResult(): AnalysisResult {
  return mockAnalysisResult;
}
