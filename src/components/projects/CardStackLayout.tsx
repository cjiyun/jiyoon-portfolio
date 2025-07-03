import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import type { ProjectT, ProjectRotation } from '@/types/type';
import { IconButton } from '@/components/common/IconButton';
import StackCardItem from '@/components/projects/StackCardItem';
import { buttonVariants } from '@/animations/variants';

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

  if (deck.length === 0) {
    return null;
    // 또는 <div>로딩중…</div> 같은 플레이스홀더를 띄워도 좋습니다.
  }

  const frontIdx = deck[deck.length - 1];
  const backCards = deck.slice(0, -1);

  const variants: Variants = {
    initial: { x: 0, y: 0, opacity: 1, rotate: 0 },
    exitNext: {
      x: 200,
      y: -200,
      rotate: 45,
      opacity: [1, 0.95, 0],
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
      },
    },
    enterPrev: { x: 240, y: -300, opacity: 0, rotate: 45 },
    animatePrev: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // deck 순환 및 action 초기화
  const cycle = (dir: 'next' | 'prev') => {
    setDeck(d =>
      dir === 'next' ? [...d.slice(1), d[0]] : [d[d.length - 1], ...d.slice(0, d.length - 1)]
    );
    setAction(null);
  };

  return (
    <div className="px-8">
      <div className="relative mx-auto flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between">
          <button onClick={() => setAction('prev')} className="cursor-pointer">
            <IoIosArrowBack size={36} />
          </button>
          <div className="aspect-card h-[440px]" style={{ perspective: 800 }}>
            {/* 스택 뒤 카드들 */}
            {deck.map((idx, i) => (
              <StackCardItem
                key={cards[idx].id}
                card={cards[idx]}
                index={i}
                isFront={idx === frontIdx}
                isBackmost={idx === backCards[0]}
                action={action}
                backCount={backCards.length}
                variants={variants}
                cycle={cycle}
              />
            ))}
          </div>
          <button onClick={() => setAction('next')} className="cursor-pointer">
            <IoIosArrowForward size={36} />
          </button>
        </div>

        {/* 카드 정보 */}
        <div className="flex w-[400px] flex-col justify-center gap-4">
          <div className="flex justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {filtered[frontIdx].category.map(cat => (
                <span
                  key={cat}
                  className="bg-bluePrimary inline-block rounded-full px-3 py-1 text-sm text-white"
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
                className="inline-block cursor-pointer rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600"
              >
                자세히 보기
              </motion.button>
              <IconButton href={filtered[frontIdx].github}>
                <AiFillGithub size={25} />
              </IconButton>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{filtered[frontIdx].title}</h3>
            <p className="break-keep text-gray-900">{filtered[frontIdx].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStackLayout;
