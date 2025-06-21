
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react';

interface ExperienceProps {
  setActiveSection: (section: string) => void;
}

const Experience: React.FC<ExperienceProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('experience');
    },
  });

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const experiences = [
    {
      title: 'Principal Data Engineer - Full-Stack Solutions',
      company: 'University of North Carolina at Charlotte',
      period: 'Feb 2024 – Dec 2024',
      location: 'Charlotte, NC',
      description: [
        'Led comprehensive data engineering and full-stack development initiatives for university systems',
        'Architected enterprise-grade data pipelines processing terabytes of information with 99.9% reliability',
        'Delivered end-to-end solutions from data ingestion to interactive dashboards',
        'Improved operational efficiency and decision-making capabilities across multiple departments'
      ],
      details: [
        'Built scalable full-stack applications serving 10K+ users with responsive dashboards',
        'Developed robust ETL pipelines processing multi-terabyte datasets with 99.9% reliability',
        'Created comprehensive analytics solutions generating actionable business insights',
        'Delivered 15+ data engineering projects improving operational efficiency by 75%',
      ],
    },
    {
      title: 'Data Engineer Intern - Solutions Development',
      company: 'FireEye',
      period: 'Sep 2024 – Dec 2024',
      location: 'Charlotte, NC',
      description: [
        'Developed cutting-edge data solutions for cybersecurity analytics',
        'Built modern ETL frameworks reducing development time significantly',
        'Created full-stack applications transforming complex security data into actionable insights',
        'Focused on high-performance data processing and intuitive user interfaces'
      ],
      details: [
        'Developed scalable data solutions using Python, Java, and JavaScript',
        'Implemented ETL frameworks reducing development time by 70%',
        'Built full-stack applications providing intuitive interfaces for complex data analysis',
        'Created dashboards and reports for security operations teams',
      ],
    },
    {
      title: 'Data Engineer Intern - Enterprise Solutions',
      company: 'Bank of America',
      period: 'May 2024 – Jul 2024',
      location: 'Charlotte, NC',
      description: [
        'Designed and implemented enterprise-grade ETL pipelines for critical financial data processing',
        'Achieved exceptional performance improvements in financial systems',
        'Developed sophisticated dashboard applications enabling real-time financial analytics',
        'Established comprehensive engineering best practices for data integrity and testing'
      ],
      details: [
        'Built ETL pipelines achieving 85% improvement in query performance',
        'Developed dashboard applications enabling real-time financial analytics',
        'Optimized SQL queries improving system efficiency by 90%',
        'Established engineering best practices for data integrity and testing',
      ],
    },
    {
      title: 'Data Engineer',
      company: 'Tata Consultancy Services',
      period: 'Jul 2021 – Jul 2023',
      location: 'Chennai, India',
      description: [
        'Architected and deployed large-scale cloud-native data platforms',
        'Supported enterprise operations for 200+ stakeholders across multiple business units',
        'Developed sophisticated ETL frameworks orchestrating hundreds of daily data pipelines',
        'Led cross-functional teams and mentored junior engineers'
      ],
      details: [
        'Built scalable data platforms with unified access to enterprise data',
        'Developed ETL frameworks orchestrating 300+ daily pipelines with 99.9% reliability',
        'Created interactive dashboards improving analyst productivity by 40%',
        'Led delivery of 20+ projects and mentored team of 6 engineers',
      ],
    },
    {
      title: 'Data Engineer',
      company: 'CricClubs (Startup)',
      period: 'Feb 2021 – Jul 2021',
      location: 'Hyderabad, India',
      description: [
        'Built comprehensive analytics platform from ground up for rapidly growing sports technology startup',
        'Served 500K+ active users with high-performance web applications',
        'Handled massive concurrent user loads while maintaining optimal performance',
        'Implemented automated data processing systems connecting diverse external data sources'
      ],
      details: [
        'Developed analytics platform enabling real-time data processing',
        'Built responsive web applications serving 200K+ concurrent users',
        'Implemented automated ETL pipelines connecting 20+ external data sources',
        'Created custom dashboards translating complex analytics into business insights',
      ],
    },
    {
      title: 'Research Assistant - Data Engineering Lab',
      company: 'Jawaharlal Nehru Technological University',
      period: 'Jul 2020 – Feb 2021',
      location: 'Hyderabad, India',
      description: [
        'Conducted innovative research in data processing optimization',
        'Developed novel frameworks for academic research dataset integration',
        'Implemented advanced optimization strategies improving query performance',
        'Contributed to establishing industry best practices for academic research'
      ],
      details: [
        'Created configurable frameworks for research dataset integration',
        'Implemented optimization strategies improving query performance by 45%',
        'Researched novel approaches to data pipeline design',
        'Established best practices adopted in academic coursework',
      ],
    },
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="experience" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-500 hidden md:block" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'md:ml-20' : 'md:ml-20 md:pl-8'}`}
              >
                <div className="absolute -left-12 top-6 w-4 h-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full hidden md:block" />
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-black backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-pink-500/20 border border-purple-600 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => toggleCard(index)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                        {exp.title}
                      </h3>
                      <div className="text-lg font-semibold text-pink-500 mb-2">
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-purple-200">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-pink-500"
                    >
                      {expandedCard === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </motion.div>
                  </div>
                  
                  <ul className="space-y-2 text-purple-200">
                    {exp.description.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mt-4 pt-4 border-t border-purple-600">
                          {exp.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detailIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              className="flex items-start gap-2 text-purple-200"
                            >
                              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
