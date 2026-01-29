import { useCallback, useMemo, useRef, useState } from 'react';
import { PORTFOLIO_SECTIONS, type SectionId } from '@/pages/sections';
import { useActiveSectionOnScroll } from '@/hooks/useActiveSectionOnScroll';

type MenuSectionId = Exclude<SectionId, 'thumbnail'>;

export const useNavigation = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  const [activeId, setActiveId] = useState<SectionId>('thumbnail');
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo(() => PORTFOLIO_SECTIONS.filter(s => s.id !== 'thumbnail'), []);

  const activeMenuId: MenuSectionId | null =
    activeId === 'thumbnail' ? null : (activeId as MenuSectionId);

  useActiveSectionOnScroll<SectionId>({
    onChange: nextId => {
      if (nextId) setActiveId(nextId);
    },
  });

  const scrollToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const onNavigate = useCallback(
    (id: SectionId) => {
      scrollToSection(id);
      closeMobile();
    },
    [scrollToSection, closeMobile]
  );

  const scrollToTop = useCallback(() => onNavigate('thumbnail'), [onNavigate]);

  return {
    headerRef,
    items,
    activeId,
    activeMenuId,
    mobileOpen,
    openMobile,
    closeMobile,
    onNavigate,
    scrollToTop,
    scrollToSection,
  };
};
