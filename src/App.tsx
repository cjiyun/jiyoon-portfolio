import { ThemeProvider } from '@/provider/ThemeProvider';
import { ThemeModeProvider } from '@/provider/ThemeModeProvider';
import { useThemeMode } from '@/hooks/useThemeMode';
import GlobalStyle from '@/styles/GlobalStyle';
import Sidebar from '@/components/main/Sidebar';
import Thumbnail from '@/pages/Thumbnail';
import AboutMe from '@/pages/AboutMe';
import Skills from '@/pages/Skills';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';
import '@/App.css';

function AppContent() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <>
      <GlobalStyle />
      <Sidebar theme={mode} onToggleTheme={toggleMode} />
      <div className="relative">
        <Thumbnail />
        <div className="bg-white px-[5%] lg:px-[10%] lg:pr-[calc(10%+100px)]">
          <section id="aboutme" data-index="0" className="scroll-section">
            <AboutMe />
          </section>
          <section id="skills" data-index="1" className="scroll-section">
            <Skills />
          </section>
          <section id="projects" data-index="2" className="scroll-section">
            <Projects />
          </section>
          <section id="contact" data-index="3" className="scroll-section">
            <Contact />
          </section>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ThemeModeProvider>
  );
}

export default App;
