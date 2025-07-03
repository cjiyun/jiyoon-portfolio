import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { ProjectT } from '@/types/type';
import { buttonVariants } from '@/animations/variants';
import { LinkButton } from '@/components/common/LinkButton';
import { buttons } from '@/constants/buttons';
import { AiOutlineSearch } from 'react-icons/ai';

interface GridCardItemProps {
  project: ProjectT;
}

const GridCardItem = ({ project }: GridCardItemProps): ReactElement | null => {
  const githubBtn = buttons.find(b => b.label === 'cjiyun');

  if (!githubBtn) return null;
  const { Icon, label, href } = githubBtn;

  return (
    <div style={{ perspective: 1000 }} className="aspect-card flex w-full pb-10 sm:pb-0">
      <motion.article
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full w-full cursor-pointer"
      >
        <div
          className="shadow-box absolute inset-0 overflow-hidden rounded-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="bg-bg/70 absolute bottom-0 flex h-32 w-full flex-col justify-between p-4">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.category.map(cat => (
                <span
                  key={cat}
                  className="bg-bluePrimary inline-block rounded-lg px-2.5 py-0.5 text-center text-sm text-white"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="shadow-box absolute inset-0 overflow-hidden rounded-lg bg-blue-50 p-10 text-gray-900 sm:p-6"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h3 className="line-clamp-2 text-xl leading-tight font-bold">{project.title}</h3>
              <p className="text-gray-900">{project.description}</p>
            </div>
            <div className="grid-auto-fit-110 grid w-full justify-items-center gap-2 self-center">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-full border border-gray-600 px-3 py-1"
              >
                <AiOutlineSearch size={20} />
                <span>자세히 보기</span>
              </motion.button>
              <LinkButton href={href} className="h-full justify-center gap-1 px-3 py-1">
                <Icon size={20} />
                <span>{label}</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default GridCardItem;
