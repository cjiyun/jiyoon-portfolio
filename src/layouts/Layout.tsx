import { useThemeMode } from '@/hooks/useThemeMode';
import { PortfolioSections } from '@/pages/PortfolioSections';
import Navigation from '@/components/nav/Navigation';

export const Layout = () => {
  const { toggleMode } = useThemeMode();

  return (
    <>
      <Navigation onToggleTheme={toggleMode} />
      <div className="relative">
        <PortfolioSections />
      </div>
    </>
  );
};
