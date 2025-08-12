import { motion, type Variants } from 'framer-motion';
import { iconVariants } from '@/animations/variants';
import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  variants?: Variants;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  href,
  onClick,
  variants = iconVariants,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={variants}
    whileHover="hover"
    whileTap="tap"
    transition={{ duration: 0.3 }}
    onClick={onClick}
    className="cursor-pointer"
  >
    {children}
  </motion.a>
);
