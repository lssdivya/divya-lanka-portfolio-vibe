
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('hero');
    },
  });

  const roles = [
    'Data Scientist',
    'Data Engineer', 
    'Software Developer',
    'AI/ML Engineer'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      icon: Github,
      url: 'https://github.com/lssdivya',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/divyaa-l',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      url: 'mailto:Lss.divya27@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <section id="hero" ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden pb-32 bg-gray-900">
      {/* Animated gradient overlay - now more visible on light background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-transparent to-cyan-200/30"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.2), transparent, rgba(6, 182, 212, 0.2))',
            'linear-gradient(135deg, rgba(6, 182, 212, 0.2), transparent, rgba(59, 130, 246, 0.2))',
            'linear-gradient(225deg, rgba(59, 130, 246, 0.2), transparent, rgba(6, 182, 212, 0.2))',
            'linear-gradient(315deg, rgba(6, 182, 212, 0.2), transparent, rgba(59, 130, 246, 0.2))',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gray-200 mr-4">Hey 👋, I'm</span>
            <motion.span 
              className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Sai Divya Lanka
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
          >
            <div className="flex items-center justify-center">
              <span className="text-gray-800">I am a </span>
              <div className="relative ml-2 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ y: -30, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: 30, opacity: 0, rotateX: 90 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 20,
                      duration: 0.4
                    }}
                    className="text-gray-800 font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.3, 
                  rotate: 10,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <social.icon size={20} />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4 justify-center mb-16"
          >
            <Button 
              onClick={() => setActiveSection('contact')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Let's Connect
            </Button>
            <Button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf'; // You'll need to add your resume PDF to the public folder
                link.download = 'Sai_Divya_Lanka_Resume.pdf';
                link.click();
              }}
              variant="outline"
              size="lg"
              className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ 
                color: ['#3b82f6', '#06b6d4', '#3b82f6'],
                filter: ['drop-shadow(0 0 5px #3b82f6)', 'drop-shadow(0 0 10px #06b6d4)', 'drop-shadow(0 0 5px #3b82f6)']
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
