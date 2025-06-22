
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Cpu, Globe, Zap, Settings, Terminal, GitBranch, Layers, Box } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const techIcons = [Code2, Database, Cpu, Globe, Zap, Settings, Terminal, GitBranch, Layers, Box];
  
  return (
    <div className="fixed inset-0 pointer-events-none w-full h-full overflow-hidden z-0">
      {/* Bright floating tech icons */}
      {techIcons.map((Icon, index) => (
        <motion.div
          key={`tech-${index}`}
          className="absolute text-purple-500 opacity-60"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          <Icon size={20 + Math.random() * 12} />
        </motion.div>
      ))}
      
      {/* More visible gradient orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-2xl"
          style={{
            width: `${200 + Math.random() * 150}px`,
            height: `${200 + Math.random() * 150}px`,
            left: `${Math.random() * 70}%`,
            top: `${Math.random() * 70}%`,
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 150 - 75, 0],
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
        />
      ))}
      
      {/* More visible geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border-2 border-purple-500/40"
          style={{
            width: '40px',
            height: '40px',
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
            borderRadius: i % 2 === 0 ? '50%' : '0%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Brighter pulsing dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-3 h-3 bg-pink-500/70 rounded-full"
          style={{
            left: `${Math.random() * 98}%`,
            top: `${Math.random() * 98}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Additional moving lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          style={{
            width: '200px',
            height: '2px',
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            transformOrigin: 'center',
          }}
          animate={{
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
