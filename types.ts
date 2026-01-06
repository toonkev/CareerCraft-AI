export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
  gpa?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  points: string[];
}

export interface SkillItem {
  id: string;
  category: string;
  items: string; // Comma separated string for easy editing
}

export enum TabView {
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW',
  ANALYSIS = 'ANALYSIS',
  REVIEW = 'REVIEW'
}

export interface AnalysisResult {
  feedback: string[];
  missingKeywords: string[];
  improvedExperience: {
    id: string;
    points: string[];
  }[];
}
