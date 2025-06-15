import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  theme: string;
  onToggleTheme: () => void;
}

const Sidebar = ({ theme, onToggleTheme }: SidebarProps): ReactElement => {
  return (
    <div>
      <div className="grid-sidebar fixed z-[999] h-[70px] w-screen items-center justify-between gap-10 px-[5%] lg:right-[5%] lg:h-screen lg:w-[70px] lg:flex-col lg:px-0 lg:py-[5%]">
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.span
              key="dark"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              exit={{ rotate: -360, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="material-symbols-outlined hover-fill cursor-pointer lg:self-start"
              onClick={onToggleTheme}
            >
              dark_mode
            </motion.span>
          ) : (
            <motion.span
              key="light"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              exit={{ rotate: -360, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="material-symbols-outlined hover-fill cursor-pointer lg:self-start"
              onClick={onToggleTheme}
            >
              clear_day
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex flex-row items-center justify-center gap-10 lg:flex-col">
          <span className="material-symbols-outlined hover-fill hover-expand cursor-pointer">
            id_card
          </span>
          <span className="material-symbols-outlined hover-fill hover-expand cursor-pointer">
            code_blocks
          </span>
          <span className="material-symbols-outlined hover-fill hover-expand cursor-pointer">
            folder_copy
          </span>
          <span className="material-symbols-outlined hover-fill hover-expand cursor-pointer">
            sms
          </span>
        </div>
      </div>
      <div className="fixed right-[5%] bottom-[6%] z-[999] flex w-[70px] items-center justify-center">
        <span className="material-symbols-outlined hover-fill cursor-pointer">
          expand_circle_up
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
