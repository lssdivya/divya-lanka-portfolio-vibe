
import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from './AnimatedCounter';
import { Coffee, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  setActiveSection: (section: string) => void;
  darkMode?: boolean;
}

const About: React.FC<AboutProps> = ({ setActiveSection, darkMode = false }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('about');
    },
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const aboutText = "I'm a passionate Data Engineer and Full-Stack Developer who transforms raw data into powerful, scalable solutions that drive business impact. With 4+ years of experience building enterprise-grade data pipelines, modern web applications, and intelligent analytics platforms, I specialize in bridging the gap between complex data challenges and elegant user experiences. From architecting cloud native ETL frameworks that process terabytes of data to developing responsive React applications serving hundreds of thousands of users, I thrive on turning ambitious ideas into production-ready solutions. My expertise spans the entire data lifecycle from ingestion and processing to visualization and deployment, always with a focus on performance, scalability, and innovation.";

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const section = sectionRef.current;
    const spans = section.querySelectorAll('span.letter');
    const totalLetters = spans.length;
    
    if (totalLetters === 0) return;
    
    const scrollDistance = totalLetters * 3; // 3px per letter for smooth scrolling

    // Set initial state - all letters gray
    gsap.set(spans, { color: '#9CA3AF' });

    // Create the pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          console.log(`Progress: ${Math.round(self.progress * 100)}%`);
        }
      }
    });

    // Animate letters to white with stagger
    tl.to(spans, {
      color: '#FFFFFF',
      duration: 1,
      stagger: {
        each: 1 / totalLetters,
        ease: 'none'
      },
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split text into individual letters wrapped in spans
  const renderTextWithLetters = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="about" ref={ref} className="min-h-screen bg-black text-white">
      {/* Scroll-locked text section */}
      <div 
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center bg-black px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 mb-16">
            {/* Left Column - Title and Avatar */}
            <div className="flex flex-col items-center lg:items-start">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-6 lg:mb-8"
              >
                <span className="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  About Me
                </span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/50"
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/4a1fa786-49a1-40b8-a511-5302052843a2.png" 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column - Text with letter highlighting */}
            <div className="flex-1">
              <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-700">
                <div
                  ref={textRef}
                  className="text-xl md:text-2xl leading-relaxed font-medium"
                >
                  {renderTextWithLetters(aboutText)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Achievements - Regular scrolling section */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-20">
          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            {[
              { end: 4, label: 'Years Experience', suffix: '+' },
              { end: 48, label: 'Projects Delivered', suffix: '' },
              { end: 100, label: 'Users Served', suffix: 'K+' },
              { end: 1000, label: 'Cups of Coffee', suffix: '?', icon: Coffee, note: 'Not sure though, haha' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-gray-900 backdrop-blur-sm rounded-2xl p-6 border border-purple-600 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2 flex items-center justify-center gap-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} isInView={statsInView} />
                  {stat.icon && <stat.icon size={32} className="text-pink-500" />}
                </div>
                <div className="text-purple-200 font-medium">
                  {stat.label}
                  {stat.note && <div className="text-xs text-slate-400 mt-1">{stat.note}</div>}
                  {index === 1 && <div className="text-xs text-slate-400 mt-1">Still counting...</div>}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Key Achievements
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Leadership', subtitle: 'Software Development Club Lead' },
                { title: 'Teaching', subtitle: 'Graduate Teaching Assistant for Database Systems' },
                { title: 'Research', subtitle: 'Graduate Research Assistant' }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900 rounded-2xl p-6 border border-purple-600 text-center shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-white" />
                  </div>
                  <div className="font-semibold text-pink-500 mb-2">{achievement.title}</div>
                  <div className="text-purple-200 text-sm">{achievement.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
