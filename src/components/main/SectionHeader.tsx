import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps): ReactElement => {
  return (
    <div className="flex w-full items-center gap-5 truncate pt-25 lg:pt-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <motion.div
        className="h-[1px] w-full origin-left border border-black bg-black"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default SectionHeader;
