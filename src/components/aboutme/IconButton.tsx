import { motion, type Variants } from 'framer-motion';
import { iconVariants } from '@/animations/variants';
import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variants?: Variants;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  variants = iconVariants,
}) => (
  <motion.button
    variants={variants}
    whileHover="hover"
    whileTap="tap"
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    onClick={onClick}
    className="cursor-pointer"
  >
    {children}
  </motion.button>
);
