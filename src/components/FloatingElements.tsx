
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Globe, Zap, Settings, Terminal, GitBranch } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Code, Database, Cpu, Globe, Zap, Settings, Terminal, GitBranch];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden w-full h-full">
      {/* Professional floating tech icons */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-400/30"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          <Icon size={24 + Math.random() * 16} />
        </motion.div>
      ))}
      
      {/* Subtle gradient orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-2xl"
          style={{
            width: `${150 + Math.random() * 100}px`,
            height: `${150 + Math.random() * 100}px`,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Professional geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-purple-400/20"
          style={{
            width: '60px',
            height: '60px',
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            borderRadius: i % 2 === 0 ? '50%' : '0%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Subtle pulsing dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
