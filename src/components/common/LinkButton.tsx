import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { buttonVariants } from '@/animations/variants';

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const LinkButton = ({ href, children, className = '' }: LinkButtonProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    transition={{ duration: 0.2 }}
    className={`flex w-full cursor-pointer items-center rounded-full border border-gray-600 ${className}`}
  >
    {children}
  </motion.a>
);
