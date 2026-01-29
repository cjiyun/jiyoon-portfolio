import { useMemo, useRef, useState } from 'react';
import { PORTFOLIO_SECTIONS, type SectionId } from '@/pages/sections';
import { useActiveSectionOnScroll } from '@/hooks/useActiveSectionOnScroll';
import HeaderNav from '@/components/main/HeaderNav';
import DrawerNav from '@/components/main/DrawerNav';

interface NavigationProps {
  onToggleTheme: () => void;
}

type MenuSectionId = Exclude<SectionId, 'thumbnail'>;

const Navigation = ({ onToggleTheme }: NavigationProps) => {
  const headerRef = useRef<HTMLElement | null>(null);

  const [activeId, setActiveId] = useState<SectionId>('thumbnail');
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo(() => PORTFOLIO_SECTIONS.filter(s => s.id !== 'thumbnail'), []);
  const activeMenuId: MenuSectionId | null =
    activeId === 'thumbnail' ? null : (activeId as MenuSectionId);

  useActiveSectionOnScroll<SectionId>({
    onChange: nextId => {
      if (!nextId) return;
      setActiveId(nextId);
    },
  });

  const scrollToSection = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  const scrollToTop = () => scrollToSection('thumbnail');

  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  const onNavigate = (id: SectionId) => {
    scrollToSection(id);
    closeMobile();
  };

  return (
    <>
      <HeaderNav
        headerRef={headerRef}
        items={items}
        activeId={activeId}
        activeMenuId={activeMenuId}
        onToggleTheme={onToggleTheme}
        onLogoClick={scrollToTop}
        onNavigate={onNavigate}
      />

      <DrawerNav
        items={items}
        activeId={activeId}
        activeMenuId={activeMenuId}
        isOpen={mobileOpen}
        onOpen={openMobile}
        onClose={closeMobile}
        onToggleTheme={onToggleTheme}
        onLogoClick={() => onNavigate('thumbnail')}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Navigation;
