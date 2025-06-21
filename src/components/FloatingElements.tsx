
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Globe, Zap, Settings, Terminal, GitBranch } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Code, Database, Cpu, Globe, Zap, Settings, Terminal, GitBranch];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden w-full h-full">
      {/* Professional floating tech icons */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-400/40"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
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
      
      {/* Gradient orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
          style={{
            width: `${200 + Math.random() * 150}px`,
            height: `${200 + Math.random() * 150}px`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
        />
      ))}
      
      {/* Professional geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-purple-400/30"
          style={{
            width: '40px',
            height: '40px',
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            borderRadius: i % 2 === 0 ? '50%' : '0%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 25 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Pulsing dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-3 h-3 bg-purple-400/60 rounded-full"
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
