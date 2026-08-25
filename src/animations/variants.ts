import type { Variants } from 'framer-motion';

export const buttonVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1, transition: { duration: 0.12, ease: 'easeOut' } },
  tap: { y: 0, scale: 0.95, transition: { duration: 0.08, ease: 'easeOut' } },
} as const;

export const imgVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.24, ease: 'easeOut' } },
} as const;

export const iconVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1.02, transition: { duration: 0.18, ease: 'easeOut' } },
  tap: { y: 0, scale: 0.98, transition: { duration: 0.08, ease: 'easeOut' } },
} satisfies Variants;

export const cardStackVariants: Variants = {
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
