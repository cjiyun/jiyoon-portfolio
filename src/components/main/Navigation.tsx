import { useNavigation } from '@/hooks/useNavigation';
import HeaderNav from '@/components/main/HeaderNav';
import DrawerNav from '@/components/main/DrawerNav';

interface NavigationProps {
  onToggleTheme: () => void;
}

const Navigation = ({ onToggleTheme }: NavigationProps) => {
  const {
    headerRef,
    items,
    activeId,
    activeMenuId,
    mobileOpen,
    openMobile,
    closeMobile,
    onNavigate,
    scrollToTop,
  } = useNavigation();

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
