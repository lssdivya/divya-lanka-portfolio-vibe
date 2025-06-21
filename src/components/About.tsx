import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from './AnimatedCounter';
import { Coffee, Award } from 'lucide-react';
import type { Container, Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const aboutText = "I'm a passionate Data Engineer and Full-Stack Developer who transforms raw data into powerful, scalable solutions that drive business impact. With 4+ years of experience building enterprise-grade data pipelines, modern web applications, and intelligent analytics platforms, I specialize in bridging the gap between complex data challenges and elegant user experiences. From architecting cloud native ETL frameworks that process terabytes of data to developing responsive React applications serving hundreds of thousands of users, I thrive on turning ambitious ideas into production-ready solutions. My expertise spans the entire data lifecycle from ingestion and processing to visualization and deployment, always with a focus on performance, scalability, and innovation.";

  const words = aboutText.split(' ');

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, []);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const spans = textRef.current?.querySelectorAll('span');
      if (!spans) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        pin: true,
        scrub: 4, // Much slower scroll effect for better readability
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = spans.length;
          const currentIndex = Math.floor(progress * totalWords);

          spans.forEach((span, index) => {
            if (index <= currentIndex) {
              gsap.to(span, {
                color: darkMode ? '#ffffff' : '#000000',
                duration: 0.5,
                ease: "power2.out"
              });
            } else {
              gsap.to(span, {
                color: darkMode ? '#6b7280' : '#64748b', // Better contrast in light mode
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });
        }
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [darkMode]);

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden min-h-screen">
      {/* Animated background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: darkMode ? "#8b5cf6" : "#a855f7",
            },
            links: {
              color: darkMode ? "#ec4899" : "#f472b6",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#13131a] via-[#1f1f3f] to-[#0f0f23] dark:opacity-90 opacity-95" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
        </motion.div>

        <div className="pt-24">
          <div className="max-w-4xl mx-auto" ref={containerRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700 min-h-[60vh] flex items-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl leading-relaxed"
                ref={textRef}
              >
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block mr-2 transition-colors duration-500 ${
                      darkMode ? 'text-gray-500' : 'text-slate-500'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { end: 4, label: 'Years Experience', suffix: '+' },
            { end: 48, label: 'Projects Delivered', suffix: '' },
            { end: 100, label: 'Users Served', suffix: 'K+' },
            { end: 1000, label: 'Cups of Coffee', suffix: '?', icon: Coffee, note: 'Not sure though, haha' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center glass-effect rounded-xl p-6 border border-white/20 dark:border-gray-700/50"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} isInView={statsInView} />
                {stat.icon && <stat.icon size={32} className="text-amber-500" />}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
                {stat.note && <div className="text-xs text-gray-500 mt-1">{stat.note}</div>}
                {index === 1 && <div className="text-xs text-gray-500 mt-1">Still counting...</div>}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-white" />
              </div>
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Leadership</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Software Development Club Lead</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-white" />
              </div>
              <div className="font-semibold text-green-700 dark:text-green-300 mb-2">Teaching</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Graduate Teaching Assistant for Database Systems</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-white" />
              </div>
              <div className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Research</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Graduate Research Assistant</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
