import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  theme: string;
  onToggleTheme: () => void;
}

const Sidebar = ({ theme, onToggleTheme }: SidebarProps): ReactElement => {
  const [activeMenu, setActiveMenu] = useState<number>(-1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = document.querySelectorAll<HTMLElement>('.scroll-section');
          let found = false;
          for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const inView =
              rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            if (inView) {
              setActiveMenu(Number(section.dataset.index));
              found = true;
              break;
            }
          }
          if (!found) {
            setActiveMenu(-1);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuClick = (idx: number) => {
    const target = document.querySelector(`.scroll-section[data-index="${idx}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="bg-bg70 fixed z-[999] flex h-[60px] w-screen flex-row items-center justify-between lg:right-[5%] lg:h-screen lg:w-[60px] lg:flex-col lg:bg-transparent">
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            exit={{ rotate: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="material-symbols-outlined hover-fill absolute left-[5%] z-[10] cursor-pointer lg:top-[5%]"
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? 'dark_mode' : 'clear_day'}
          </motion.span>
        </AnimatePresence>
        <div className="absolute flex h-full w-screen flex-row items-center justify-center gap-10 lg:h-screen lg:w-full lg:flex-col">
          {['id_card', 'code_blocks', 'folder_copy', 'sms'].map((icon, idx) => (
            <span
              key={icon}
              className={`material-symbols-outlined hover-fill hover-expand cursor-pointer ${
                activeMenu === idx ? 'is-active' : ''
              }`}
              onClick={() => handleMenuClick(idx)}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
      <div className="fixed right-[5%] bottom-[5%] z-[999] flex w-[60px] items-center justify-center">
        <span className="material-symbols-outlined hover-fill cursor-pointer" onClick={scrollToTop}>
          expand_circle_up
        </span>
      </div>
    </>
  );
};

export default Sidebar;
