import type { Variants } from 'framer-motion';

export const buttonVariants = {
  hover: { backgroundColor: '#0073a1', color: '#fff', borderColor: '#0073a1' },
  tap: { scale: 0.95 },
};

export const iconVariants = {
  hover: { color: '#0073a1', transition: { duration: 0 } },
  tap: { scale: 0.8 },
};

export const sidebar = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
};

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
