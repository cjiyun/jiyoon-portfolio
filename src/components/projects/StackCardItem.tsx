import type { ReactElement } from 'react';
import type { ProjectRotation } from '@/types/type';
import { motion, type Variants } from 'framer-motion';

interface StackCardItemProps {
  card: ProjectRotation;
  index: number;
  isFront: boolean;
  isBackmost: boolean;
  action: 'next' | 'prev' | null;
  backCount: number;
  variants: Variants;
  cycle: (dir: 'next' | 'prev') => void;
}

const StackCardItem = ({
  card,
  index,
  isFront,
  isBackmost,
  action,
  backCount,
  variants,
  cycle,
}: StackCardItemProps): ReactElement => {
  if (action === 'prev' && isBackmost) {
    return (
      <motion.div
        key={card.id}
        variants={variants}
        initial="enterPrev"
        animate="animatePrev"
        onAnimationComplete={() => cycle('prev')}
        className="absolute inset-0"
        style={{ zIndex: backCount, rotate: card.rotation }}
      >
        <img
          src={card.image}
          alt={card.title}
          className="shadow-box h-full w-full rounded-lg object-cover"
        />
      </motion.div>
    );
  }

  if (!isFront) {
    return (
      <div
        key={card.id}
        className="absolute inset-0"
        style={{
          zIndex: action === 'next' ? 0 : index,
          transform: `rotate(${card.rotation}deg)`,
        }}
      >
        <img
          src={card.image}
          alt={card.title}
          className="shadow-box h-full w-full rounded-lg object-cover"
        />
      </div>
    );
  }

  return (
    <motion.div
      key={`${card.id}-${action}`}
      variants={variants}
      initial="initial"
      animate={action === 'next' ? 'exitNext' : 'initial'}
      onAnimationComplete={() => action === 'next' && cycle('next')}
      className="absolute inset-0"
      style={{ rotate: card.rotation }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="shadow-box h-full w-full rounded-lg object-cover"
      />
    </motion.div>
  );
};

export default StackCardItem;
