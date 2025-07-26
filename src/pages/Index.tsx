
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Achievements from '../components/Achievements';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import VantaBirdsBackground from '../components/VantaBirdsBackground';
import ScrollProgressBar from '../components/ScrollProgressBar';

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <>
      {/* Vanta Birds background - always show on home page */}
      <VantaBirdsBackground />
      
      {/* Progress bar */}
      <div className="relative z-50">
        <ScrollProgressBar />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 min-h-screen transition-colors duration-300 overflow-x-hidden"
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
            <Achievements setActiveSection={setActiveSection} />
            <Skills setActiveSection={setActiveSection} />
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
