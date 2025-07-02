export const buttonVariants = {
  hover: { scale: 1.1, backgroundColor: '#0073a1', color: '#fff', border: 'none' },
  tap: { scale: 0.95 },
};

export const iconVariants = {
  hover: { scale: 1.3 },
  tap: { scale: 0.95 },
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
