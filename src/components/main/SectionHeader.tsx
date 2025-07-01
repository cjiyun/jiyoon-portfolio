import type { ReactElement } from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps): ReactElement => {
  return (
    <div className="absolute flex h-fit w-full items-center gap-5 truncate pt-24 lg:pt-10">
      <div className="flex h-[60px] items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="h-0.5 w-full bg-black"></div>
    </div>
  );
};

export default SectionHeader;
