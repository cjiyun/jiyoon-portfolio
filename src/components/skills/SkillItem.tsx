import type { ReactElement } from 'react';
import type { Skill, SkillsCategory } from '@/types/type';

interface SkillItemProps {
  skill: Skill;
  selected: SkillsCategory;
}

const SkillItem = ({ skill, selected }: SkillItemProps): ReactElement => {
  const { src, alt, category } = skill;
  const isBlured = selected !== 'All' && category !== selected;

  return (
    <div
      className={`group skills-item relative transition-all duration-300 ${
        isBlured ? 'opacity-50 blur-sm' : 'opacity-100'
      }`}
    >
      <img src={src} alt={alt} />
      {!isBlured && (
        <span className="bg-blueDark absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-lg px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
          {alt}
        </span>
      )}
    </div>
  );
};

export default SkillItem;
