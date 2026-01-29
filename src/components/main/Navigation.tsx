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
    drawerOpen,
    openDrawer,
    closeDrawer,
    onNavigate,
    scrollToTop,
    isHeaderNav,
  } = useNavigation();

  if (isHeaderNav) {
    return (
      <HeaderNav
        headerRef={headerRef}
        items={items}
        activeId={activeId}
        activeMenuId={activeMenuId}
        onToggleTheme={onToggleTheme}
        onLogoClick={scrollToTop}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <DrawerNav
      headerRef={headerRef}
      items={items}
      activeId={activeId}
      activeMenuId={activeMenuId}
      isOpen={drawerOpen}
      onOpen={openDrawer}
      onClose={closeDrawer}
      onToggleTheme={onToggleTheme}
      onLogoClick={() => onNavigate('thumbnail')}
      onNavigate={onNavigate}
    />
  );
};

export default Navigation;
