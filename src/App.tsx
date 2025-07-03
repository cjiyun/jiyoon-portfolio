import { useState } from 'react';
import Sidebar from '@/components/main/Sidebar';
import Thumbnail from '@/pages/Thumbnail';
import AboutMe from '@/pages/AboutMe';
import Skills from '@/pages/Skills';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';
import '@/App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Sidebar theme={theme} onToggleTheme={toggleTheme} />
      <div className="relative">
        <Thumbnail />
        <div className="bg-white px-[5%] lg:px-[10%] lg:pr-[calc(15%+100px)]">
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

export default App;
