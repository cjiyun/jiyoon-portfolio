import GridCardItem from '@/components/projects/GridCardItem';
import type { ReactElement } from 'react';
import type { ProjectT } from '@/types/type';

interface CardGridLayoutProps {
  filtered: ProjectT[];
}

const CardGridLayout = ({ filtered }: CardGridLayoutProps): ReactElement => {
  return (
    <div className="grid h-full w-full grid-cols-1 gap-15 px-8 py-15 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filtered.map(project => (
        <GridCardItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default CardGridLayout;
