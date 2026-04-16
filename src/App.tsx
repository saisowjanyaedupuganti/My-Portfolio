import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Cursor from './components/ui/Cursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Certificates from './components/sections/Certificates';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const cursorEnter = () => setCursorVariant('link');
  const cursorLeave = () => setCursorVariant('default');

  return (
    <div className="relative">
      <Cursor variant={cursorVariant} />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <Navbar onLinkHover={cursorEnter} onLinkLeave={cursorLeave} />
            
            <main>
              <Hero />
              <About />
              <Projects onProjectHover={cursorEnter} onProjectLeave={cursorLeave} />
              <Skills />
              <Certificates />
              <Contact onInputFocus={cursorEnter} onInputBlur={cursorLeave} />
            </main>
            
            <Footer onLinkHover={cursorEnter} onLinkLeave={cursorLeave} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;