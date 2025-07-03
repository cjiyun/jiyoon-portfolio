import type { ReactElement } from 'react';
import SectionHeader from '@/components/main/SectionHeader';
import React from '@/assets/images/reactIcon.svg';
import html from '@/assets/images/htmlIcon.svg';
import css from '@/assets/images/cssIcon.svg';
import js from '@/assets/images/jsIcon.svg';
import ts from '@/assets/images/tsIcon.svg';
import tailwind from '@/assets/images/tailwindIcon.svg';
import styledComponent from '@/assets/images/styledcomponentIcon.svg';
import figma from '@/assets/images/figmaIcon.svg';
import github from '@/assets/images/githubIcon.svg';

const Skills = (): ReactElement => {
  return (
    <div className="relative flex h-screen w-full flex-col gap-10">
      <SectionHeader title="Skills" />
      <div className="bg-bg box-shadow absolute top-[138px] my-6 flex h-[calc(100%-202px)] w-full flex-col gap-10 rounded-lg p-10 lg:top-[100px]">
        <div className="grid-auto-fill-25 h-10 text-xl font-bold text-black">
          <button className="bg-bluePrimary cursor-pointer rounded-xl">All</button>
          <button className="cursor-pointer">FrontEnd</button>
          <button className="cursor-pointer">Library</button>
          <button className="cursor-pointer">Tools</button>
        </div>
        <div className="grid-auto-fill-90 items-center justify-items-center gap-[5vw]">
          <div className="skills-item drop-shadow-lg">
            <img src={React} alt="React" />
          </div>
          <div className="skills-item">
            <img src={html} alt="Html" />
          </div>
          <div className="skills-item">
            <img src={css} alt="Css" />
          </div>
          <div className="skills-item">
            <img src={js} alt="JavaScript" className="w-4/5" />
          </div>
          <div className="skills-item">
            <img src={ts} alt="TypeScript" className="w-4/5" />
          </div>
          <div className="skills-item">
            <img src={tailwind} alt="Tailwind CSS" />
          </div>
          <div className="skills-item">
            <img src={styledComponent} alt="Styled Component" className="w-4/5" />
          </div>
          <div className="skills-item">
            <img src={figma} alt="Figma" />
          </div>
          <div className="skills-item">
            <img src={github} alt="Github" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
