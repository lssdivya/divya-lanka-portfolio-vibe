
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import VantaBirdsBackground from '../components/VantaBirdsBackground';
import ScrollProgressBar from '../components/ScrollProgressBar';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');
  const { darkMode, toggleTheme } = useTheme();

  console.log('Index component rendered with darkMode:', darkMode);

  return (
    <>
      {/* Vanta Birds background - always show on home page */}
      <VantaBirdsBackground />
      
      {/* Progress bar */}
      <div className="relative z-50">
        <ScrollProgressBar />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Main content */}
      <motion.div
        className={`relative z-10 min-h-screen transition-colors duration-300 overflow-x-hidden ${
          darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-40">
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        <main className="relative z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            <Hero setActiveSection={setActiveSection} />
            <About setActiveSection={setActiveSection} darkMode={darkMode} />
            <Skills setActiveSection={setActiveSection} />
            <Experience setActiveSection={setActiveSection} />
            <Projects setActiveSection={setActiveSection} />
            <Contact setActiveSection={setActiveSection} />
          </motion.div>
        </main>

        <div className="relative z-20">
          <Footer />
        </div>
      </motion.div>
    </>
  );
}
