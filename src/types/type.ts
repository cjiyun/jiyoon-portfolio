type Category = '팀' | '개인' | 'FE' | 'BE' | '디자인' | '기획';

export type ProjectT = {
  id: number;
  title: string;
  description: string;
  category: Category[];
  image: string;
  github?: string;
};

export interface ProjectRotation extends ProjectT {
  rotation: number;
}
