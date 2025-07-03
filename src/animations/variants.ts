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

export const flipVariants = {
  rest: {
    rotateY: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    rotateY: 180,
    transition: { duration: 0.4 },
  },
};
