export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'tool';
}

export interface ComplexityScore {
  score: number;
  maxScore: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  type: 'Cognitive' | 'Technical' | 'Behavioral';
  title: string;
  description: string;
  duration: string;
  stage: 'Screening' | 'Interview' | 'Final';
  matchScore: number;
}

export interface AnalysisResult {
  skills: Skill[];
  complexityScore: ComplexityScore;
  assessments: Assessment[];
  jobTitle: string;
  processingTime: number;
}
