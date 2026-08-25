import type { ComponentType } from 'react';
import Thumbnail from '@/pages/Thumbnail';
import AboutMe from '@/pages/AboutMe';
import Skills from '@/pages/Skills';
import Projects from '@/pages/Projects';
import Guestbook from '@/pages/Guestbook';

export const PORTFOLIO_SECTIONS = [
  { id: 'thumbnail', index: 0, label: 'THUMBNAIL', Component: Thumbnail },
  { id: 'aboutme', index: 1, label: 'ABOUT ME', Component: AboutMe },
  { id: 'skills', index: 2, label: 'SKILLS', Component: Skills },
  { id: 'projects', index: 3, label: 'PROJECTS', Component: Projects },
  { id: 'guestbook', index: 4, label: 'GUESTBOOK', Component: Guestbook },
] as const satisfies ReadonlyArray<{
  id: string;
  index: number;
  label: string;
  Component: ComponentType;
}>;

export type SectionId = (typeof PORTFOLIO_SECTIONS)[number]['id'];
