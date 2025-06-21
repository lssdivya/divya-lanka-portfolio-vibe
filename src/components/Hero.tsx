
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

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
    <section id="hero" ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden pb-32 bg-gray-50">
      {/* Animated gradient overlay - now more visible on light background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-transparent to-pink-200/30"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(147, 51, 234, 0.2), transparent, rgba(236, 72, 153, 0.2))',
            'linear-gradient(135deg, rgba(236, 72, 153, 0.2), transparent, rgba(147, 51, 234, 0.2))',
            'linear-gradient(225deg, rgba(147, 51, 234, 0.2), transparent, rgba(236, 72, 153, 0.2))',
            'linear-gradient(315deg, rgba(236, 72, 153, 0.2), transparent, rgba(147, 51, 234, 0.2))',
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
            <motion.div 
              className="relative mt-16 w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/50 transform translate-y-8"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.8)"
              }}
              animate={{
                boxShadow: [
                  "0 20px 25px -5px rgba(147, 51, 234, 0.5)",
                  "0 25px 50px -12px rgba(236, 72, 153, 0.5)",
                  "0 20px 25px -5px rgba(147, 51, 234, 0.5)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <motion.img
                  src="/lovable-uploads/55fc955c-5023-4d3d-ba13-8d30a1ef83c1.png"
                  alt="Sai Divya Lanka"
                  className="w-full h-full rounded-full object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            <motion.span 
              className="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent"
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
                    className="text-gray-800 font-semibold whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
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
                  boxShadow: "0 10px 25px rgba(147, 51, 234, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
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

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={scrollToAbout}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 mb-16 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">See My Work</span>
          </motion.button>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ 
                color: ['#a855f7', '#ec4899', '#a855f7'],
                filter: ['drop-shadow(0 0 5px #a855f7)', 'drop-shadow(0 0 10px #ec4899)', 'drop-shadow(0 0 5px #a855f7)']
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
