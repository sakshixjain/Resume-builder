export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type LanguageProficiency =
  | "Native"
  | "Fluent"
  | "Proficient"
  | "Intermediate"
  | "Basic";

export type TemplateId = "modern" | "professional" | "minimal" | "executive";

export type FontFamily =
  | "inter"
  | "roboto"
  | "merriweather"
  | "outfit"
  | "jakarta"
  | "playfair";

export type FontSize = "sm" | "md" | "lg";
export type Spacing = "compact" | "normal" | "relaxed";
export type MarginSize = "compact" | "normal" | "spacious";

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: SkillLevel;
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string;
  projectUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ResumeSettings {
  template: TemplateId;
  primaryColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  spacing: Spacing;
  margins: MarginSize;
  showIcons: boolean;
}

export type SectionType =
  | "personalInfo"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "achievements"
  | string;

export interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  customSections: CustomSection[];
  sectionOrder: SectionType[];
  sectionVisibility: Record<string, boolean>;
  settings: ResumeSettings;
}
