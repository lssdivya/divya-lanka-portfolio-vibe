
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const aboutText = "I'm a passionate Data Engineer and Full-Stack Developer who transforms raw data into powerful, scalable solutions that drive business impact. With 4+ years of experience building enterprise-grade data pipelines, modern web applications, and intelligent analytics platforms, I specialize in bridging the gap between complex data challenges and elegant user experiences. From architecting cloud native ETL frameworks that process terabytes of data to developing responsive React applications serving hundreds of thousands of users, I thrive on turning ambitious ideas into production-ready solutions. My expertise spans the entire data lifecycle from ingestion and processing to visualization and deployment, always with a focus on performance, scalability, and innovation.";

  const words = aboutText.split(' ');

  useEffect(() => {
    if (!textRef.current || !scrollSectionRef.current) return;

    const ctx = gsap.context(() => {
      const spans = textRef.current?.querySelectorAll('span');
      if (!spans) return;

      // Calculate the scroll distance needed (50px per word)
      const scrollDistance = spans.length * 50;

      // Create the main ScrollTrigger for pinning and word highlighting
      ScrollTrigger.create({
        trigger: scrollSectionRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = spans.length;
          const currentWordIndex = Math.floor(progress * totalWords);

          spans.forEach((span, index) => {
            if (index <= currentWordIndex) {
              gsap.to(span, {
                color: '#ffffff',
                duration: 0.3,
                ease: "power2.out"
              });
            } else {
              gsap.to(span, {
                color: '#6b7280',
                duration: 0.3,
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
  }, []);

  return (
    <section id="about" ref={ref} className="relative bg-black text-white">
      {/* Scroll-locked text section */}
      <div ref={scrollSectionRef} className="min-h-screen flex items-center justify-center relative z-10 bg-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            {/* Left Column */}
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
                className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-purple-800 flex items-center justify-center p-2"
              >
                <img 
                  src="/lovable-uploads/4a1fa786-49a1-40b8-a511-5302052843a2.png" 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover" 
                />
              </motion.div>
            </div>

            {/* Right Column - Bio Text */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="bg-gray-900 rounded-2xl p-8 shadow-lg relative overflow-hidden border border-gray-700"
              >
                <div
                  className="text-xl md:text-2xl leading-relaxed"
                  ref={textRef}
                >
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mr-2 transition-colors duration-300 text-gray-500"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - appears after scroll-locked section */}
      <div className="py-20 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-20">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
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
            className="mt-12"
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
