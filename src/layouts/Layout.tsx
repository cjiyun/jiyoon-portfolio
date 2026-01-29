// import { useThemeMode } from '@/hooks/useThemeMode';
import { PortfolioSections } from '@/pages/PortfolioSections';

export const Layout = () => {
  // const { toggleMode } = useThemeMode();

  return (
    <>
      {/*<Sidebar onToggleTheme={toggleMode} />*/}
      <div className="relative">
        <PortfolioSections />
      </div>
    </>
  );
};
