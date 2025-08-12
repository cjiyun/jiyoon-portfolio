import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { sidebar } from '@/animations/variants';
import IcLightMode from '@/assets/icons/ic-lightmode.svg';
import IcDarkMode from '@/assets/icons/ic-darkmode.svg';
import IcAboutMe from '@/assets/icons/ic-about-me.svg';
import IcSkills from '@/assets/icons/ic-skills.svg';
import IcProjects from '@/assets/icons/ic-projects.svg';
import IcContact from '@/assets/icons/ic-contact.svg';
import IcCircleUp from '@/assets/icons/ic-circle-up.svg';

interface SidebarProps {
  theme: string;
  onToggleTheme: () => void;
}

interface IconProps {
  src: string;
  name: string;
}

const Icon: IconProps[] = [
  { src: IcAboutMe, name: 'About Me' },
  { src: IcSkills, name: 'Skills' },
  { src: IcProjects, name: 'Projects' },
  { src: IcContact, name: 'Contact' },
];

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
      <div className="bg-bg/70 fixed z-[999] flex h-[60px] w-screen flex-row items-center justify-between lg:right-10 lg:h-screen lg:w-[60px] lg:flex-col lg:bg-transparent">
        <AnimatePresence mode="wait">
          <div className="absolute left-[5%] z-[10] flex h-[60px] items-center lg:top-10 lg:left-auto">
            <motion.img
              key={theme}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              exit={{ rotate: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={theme === 'dark' ? IcDarkMode : IcLightMode}
              alt={theme === 'dark' ? 'dark' : 'light'}
              className="hover-fill cursor-pointer"
              onClick={onToggleTheme}
            ></motion.img>
          </div>
        </AnimatePresence>
        <LayoutGroup id="sidebar">
          <AnimatePresence>
            {activeMenu !== -1 && (
              <motion.div
                layout
                variants={sidebar.container}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute flex h-full w-screen flex-row items-center justify-center gap-10 lg:h-screen lg:w-full lg:flex-col"
              >
                {Icon.map(({ src, name }, idx) => (
                  <motion.button
                    key={idx}
                    variants={sidebar.item}
                    onClick={() => handleMenuClick(idx)}
                    className="group relative isolate cursor-pointer rounded-lg p-1"
                  >
                    {activeMenu === idx && (
                      <motion.span
                        layoutId="sidebarActive"
                        className="bg-active absolute inset-0 top-5 -z-10 h-1/2 rounded-md"
                        transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.9 }}
                      />
                    )}
                    <motion.img
                      src={src}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="relative z-10 rounded-lg"
                    />
                    <span className="bg-blueDark absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {name}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
      <div className="fixed right-10 bottom-[5%] z-[999] flex w-[60px] items-center justify-center">
        <AnimatePresence>
          {activeMenu !== -1 && (
            <motion.img
              variants={sidebar.item}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              src={IcCircleUp}
              alt="위로 이동"
              className="cursor-pointer"
              onClick={scrollToTop}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Sidebar;
