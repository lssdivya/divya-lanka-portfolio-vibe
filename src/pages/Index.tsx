
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
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingElements from '../components/FloatingElements';
import ScrollProgressBar from '../components/ScrollProgressBar';

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <>
      {/* Background layers - lowest z-index */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
        <FloatingElements />
      </div>
      
      {/* Progress bar */}
      <div className="relative z-50">
        <ScrollProgressBar />
      </div>

      {/* Main content - higher z-index */}
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
            <About setActiveSection={setActiveSection} darkMode />
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
