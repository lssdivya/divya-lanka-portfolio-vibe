
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Zap, Star, Heart, Sparkles, Cpu, Wifi, Globe, Rocket } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Code, Database, Zap, Star, Heart, Sparkles, Cpu, Wifi, Globe, Rocket];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" style={{ height: '200vh' }}>
      {/* Enhanced floating icons covering entire page */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-300"
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 180}%`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 120 - 60, 0],
            rotate: [0, 360, 0],
            scale: [0.8, 2, 0.8],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        >
          <Icon size={40 + Math.random() * 32} />
        </motion.div>
      ))}
      
      {/* Enhanced gradient orbs covering entire page */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/50 to-pink-400/50 blur-2xl"
          style={{
            width: `${180 + Math.random() * 150}px`,
            height: `${180 + Math.random() * 150}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 200}%`,
          }}
          animate={{
            x: [0, Math.random() * 500 - 250, 0],
            y: [0, Math.random() * 500 - 250, 0],
            scale: [1, 2.5, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 18 + Math.random() * 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}
      
      {/* Enhanced flowing lines covering entire page */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-purple-400/90 to-transparent"
          style={{
            width: '400px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 180}%`,
          }}
          animate={{
            x: [-400, window.innerWidth + 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear",
          }}
        />
      ))}

      {/* Pulsing dots covering entire page */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-3 h-3 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 200}%`,
          }}
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
