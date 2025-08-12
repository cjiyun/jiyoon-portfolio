type ProjectsCategory = '팀' | '개인' | 'FE' | 'BE' | '디자인' | '기획';

export type ProjectT = {
  id: number;
  name: string;
  title: string;
  description: string;
  category: ProjectsCategory[];
  image: string;
  github: string;
};

export interface ProjectRotation extends ProjectT {
  rotation: number;
}

export const skillsCategories = ['All', 'FrontEnd', 'Library', 'Tools'] as const;
export type SkillsCategory = (typeof skillsCategories)[number];

export interface Skill {
  src: string;
  alt: string;
  category: SkillsCategory;
}
