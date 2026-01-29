import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PORTFOLIO_SECTIONS, type SectionId } from '@/pages/sections';
import { useActiveSectionOnScroll } from '@/hooks/useActiveSectionOnScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type MenuSectionId = Exclude<SectionId, 'thumbnail'>;

export const useNavigation = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  const [activeId, setActiveId] = useState<SectionId>('thumbnail');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHeaderNav = useMediaQuery('(min-width: 821px)');

  useEffect(() => {
    if (isHeaderNav) setDrawerOpen(false);
  }, [isHeaderNav]);

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

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const onNavigate = useCallback(
    (id: SectionId) => {
      scrollToSection(id);
      closeDrawer();
    },
    [scrollToSection, closeDrawer]
  );

  const scrollToTop = useCallback(() => onNavigate('thumbnail'), [onNavigate]);

  return {
    headerRef,
    items,
    activeId,
    activeMenuId,
    drawerOpen,
    openDrawer,
    closeDrawer,
    onNavigate,
    scrollToTop,
    scrollToSection,
    isHeaderNav,
  };
};
