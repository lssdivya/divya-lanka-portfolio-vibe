
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Zap, Star, Heart, Sparkles, Cpu, Wifi, Globe, Rocket } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Code, Database, Zap, Star, Heart, Sparkles, Cpu, Wifi, Globe, Rocket];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden w-full" style={{ minHeight: '300vh' }}>
      {/* Enhanced floating icons covering entire page */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-300"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 250}%`,
          }}
          animate={{
            y: [0, -300, 0],
            x: [0, Math.random() * 150 - 75, 0],
            rotate: [0, 360, 0],
            scale: [1, 2.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <Icon size={50 + Math.random() * 40} />
        </motion.div>
      ))}
      
      {/* Enhanced gradient orbs covering entire page */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/70 to-pink-400/70 blur-3xl"
          style={{
            width: `${200 + Math.random() * 200}px`,
            height: `${200 + Math.random() * 200}px`,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 250}%`,
          }}
          animate={{
            x: [0, Math.random() * 600 - 300, 0],
            y: [0, Math.random() * 600 - 300, 0],
            scale: [1, 3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
        />
      ))}
      
      {/* Enhanced flowing lines covering entire page */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-1 bg-gradient-to-r from-transparent via-purple-400/90 to-transparent"
          style={{
            width: '500px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 250}%`,
          }}
          animate={{
            x: [-500, window.innerWidth + 500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}

      {/* Pulsing dots covering entire page */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-4 h-4 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 250}%`,
          }}
          animate={{
            scale: [1, 3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
