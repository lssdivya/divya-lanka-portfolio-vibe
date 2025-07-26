
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExperienceCard from './ExperienceCard';
import { experiences } from './ExperienceData';

interface ExperienceProps {
  setActiveSection: (section: string) => void;
}

const Experience: React.FC<ExperienceProps> = ({ setActiveSection }) => {
  console.log('Experience component is rendering');
  
  const [ref, inView] = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      console.log('Experience inView changed:', inView);
      if (inView) setActiveSection('experience');
    },
  });

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  console.log('Experiences array length:', experiences.length);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  console.log('Rendering Experience section');

  return (
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 hidden md:block" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isExpanded={expandedCard === index}
                onToggle={toggleCard}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
