import { type ReactElement, useState } from 'react';
import { type Skill, type SkillsCategory, skillsCategories } from '@/types/type';
import SectionHeader from '@/components/main/SectionHeader';
import SkillItem from '@/components/skills/SkillItem';
import react from '@/assets/images/reactIcon.svg';
import html from '@/assets/images/htmlIcon.svg';
import css from '@/assets/images/cssIcon.svg';
import js from '@/assets/images/jsIcon.svg';
import ts from '@/assets/images/tsIcon.svg';
import tailwind from '@/assets/images/tailwindIcon.svg';
import styledComponent from '@/assets/images/styledcomponentIcon.svg';
import figma from '@/assets/images/figmaIcon.svg';
import github from '@/assets/images/githubIcon.svg';

const SKILLS: Skill[] = [
  { src: html, alt: 'HTML', category: 'FrontEnd' },
  { src: css, alt: 'CSS', category: 'FrontEnd' },
  { src: js, alt: 'JavaScript', category: 'FrontEnd' },
  { src: ts, alt: 'TypeScript', category: 'FrontEnd' },
  { src: react, alt: 'React', category: 'Library' },
  { src: tailwind, alt: 'Tailwind CSS', category: 'Library' },
  { src: styledComponent, alt: 'Styled Component', category: 'Library' },
  { src: figma, alt: 'Figma', category: 'Tools' },
  { src: github, alt: 'Github', category: 'Tools' },
];

const Skills = (): ReactElement => {
  const [selected, setSelected] = useState<SkillsCategory>('All');

  return (
    <div className="flex w-full flex-col">
      <SectionHeader title="Skills" />
      <div className="bg-bg box-shadow my-12 flex h-fit min-h-[70vh] w-full flex-col gap-10 rounded-lg p-5 sm:p-8">
        <div className="flex h-10 w-full items-center gap-2 text-xl font-bold text-black">
          {skillsCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`hover:text-bluePrimary cursor-pointer rounded-xl py-1 transition-all duration-500 ease-in-out ${selected === cat ? 'bg-bluePrimary flex-[2] !text-white' : 'flex-1 bg-transparent text-gray-700'} `}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="xs:grid-cols-4 grid w-full grid-cols-3 justify-items-center gap-10 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {SKILLS.map(skill => (
            <SkillItem key={skill.alt} skill={skill} selected={selected} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
