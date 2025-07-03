import { motion, type Variants } from 'framer-motion';
import { iconVariants } from '@/animations/variants';
import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  href?: string;
  variants?: Variants;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  href,
  variants = iconVariants,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={variants}
    whileHover="hover"
    whileTap="tap"
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="cursor-pointer"
  >
    {children}
  </motion.a>
);
