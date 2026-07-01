import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, Users, Coffee } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface AchievementsProps {
  setActiveSection: (section: string) => void;
}

export default function Achievements({ setActiveSection }: AchievementsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      setActiveSection('achievements');
    }
  }, [inView, setActiveSection]);

  const achievements = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: 5,
      suffix: "+",
      label: "Years",
      subtitle: "Experience",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: 87,
      suffix: "",
      label: "Projects",
      subtitle: "Delivered",
      subtext: "Still counting...",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: 100,
      suffix: "K+",
      label: "Users Served",
      subtitle: "",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      number: 1000,
      suffix: "?",
      label: "Cups of Coffee",
      subtitle: "Not sure though,",
      subtext: "haha",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const keyAchievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Leadership",
      description: "Girls who Code Club Lead, AI ML Club Founder at UNCC",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Teaching",
      description: "Graduate Teaching Assistant for Applied Machine Learning, Database Systems Design",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Research",
      description: "Graduate Research Assistant",
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <section 
      id="achievements" 
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100/30"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                {achievement.icon}
              </div>
              <div className="text-center">
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <AnimatedCounter 
                    end={achievement.number} 
                    suffix={achievement.suffix}
                    isInView={inView}
                    duration={2000}
                  />
                </motion.h3>
                <p className="text-lg font-semibold text-blue-600 mb-1">{achievement.label}</p>
                {achievement.subtitle && (
                  <p className="text-sm text-blue-500">{achievement.subtitle}</p>
                )}
                {achievement.subtext && (
                  <p className="text-xs text-gray-500 mt-1">{achievement.subtext}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Achievements Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Key Achievements
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6, staggerChildren: 0.1 }}
        >
          {keyAchievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100/30 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white mb-6 mx-auto`}>
                {achievement.icon}
              </div>
              <h3 className="text-xl font-semibold text-cyan-600 mb-4">{achievement.title}</h3>
              <p className="text-blue-600 font-medium">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}