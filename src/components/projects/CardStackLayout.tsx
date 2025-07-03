import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import type { ProjectT, ProjectRotation } from '@/types/type';
import { IconButton } from '@/components/common/IconButton';
import StackCardItem from '@/components/projects/StackCardItem';
import { buttonVariants, cardStackVariants } from '@/animations/variants';

interface CardStackLayoutProps {
  filtered: ProjectT[];
}

const CardStackLayout = ({ filtered }: CardStackLayoutProps) => {
  const [cards, setCards] = useState<ProjectRotation[]>([]);
  const [deck, setDeck] = useState<number[]>([]);
  const [action, setAction] = useState<'next' | 'prev' | null>(null);

  useEffect(() => {
    const newCards = filtered.map(p => ({
      ...p,
      rotation: Math.random() * 12 - 6,
    }));
    setCards(newCards);
    // 0부터 newCards.length-1 까지
    setDeck(newCards.map((_, i) => i));
  }, [filtered]);

  if (deck.length === 0 || filtered.length === 0) {
    return null;
  }

  const frontIdx = deck[deck.length - 1];
  const backCards = deck.slice(0, -1);

  // deck 순환 및 action 초기화
  const cycle = (dir: 'next' | 'prev') => {
    setDeck(d =>
      dir === 'next' ? [...d.slice(1), d[0]] : [d[d.length - 1], ...d.slice(0, d.length - 1)]
    );
    setAction(null);
  };

  return (
    <div className="px-8">
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between">
          <button onClick={() => setAction('prev')} className="cursor-pointer">
            <IoIosArrowBack size={36} />
          </button>
          <div className="aspect-card h-[300px]" style={{ perspective: 800 }}>
            {deck.map((idx, i) => (
              <StackCardItem
                key={cards[idx].id}
                card={cards[idx]}
                index={i}
                isFront={idx === frontIdx}
                isBackmost={idx === backCards[0]}
                action={action}
                backCount={backCards.length}
                variants={cardStackVariants}
                cycle={cycle}
              />
            ))}
          </div>
          <button onClick={() => setAction('next')} className="cursor-pointer">
            <IoIosArrowForward size={36} />
          </button>
        </div>

        {/* 카드 정보 */}
        <div className="flex max-w-96 flex-col justify-center gap-4">
          <div className="flex justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {filtered[frontIdx].category.map(cat => (
                <span
                  key={cat}
                  className="bg-bluePrimary inline-block rounded-full px-3 py-1 text-xs text-white"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="inline-block cursor-pointer rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600"
              >
                자세히 보기
              </motion.button>
              <IconButton href={filtered[frontIdx].github}>
                <AiFillGithub size={25} />
              </IconButton>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">{filtered[frontIdx].title}</h3>
            <p className="text-sm break-keep text-gray-900">{filtered[frontIdx].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStackLayout;
