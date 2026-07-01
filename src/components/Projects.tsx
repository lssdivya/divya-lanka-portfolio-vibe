import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProjectsProps {
  setActiveSection: (section: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('projects');
    },
  });

  const projects = [
    {
      title: 'Detecting AI Generated Text',
      description: 'Detect AI-generated text using BERT embeddings, linguistic features, vector similarity, and statistical scoring, with an interactive Streamlit interface.',
      details: 'AI detection system with BERT embeddings and statistical analysis',
      github: 'https://github.com/lssdivya/detect_ai_generated_text',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'BERT', 'Streamlit', 'NLP', 'Vector Similarity'],
    },
    {
      title: 'F1 Race Prediction',
      description: 'End to end F1 race outcome prediction and BI platform with Ergast ingestion, dbt feature marts, XGBoost models, and Power BI/Tableau dashboards.',
      details: 'Complete F1 prediction platform with machine learning and BI analytics',
      github: 'https://github.com/lssdivya/f1-predictor-bi',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'XGBoost', 'dbt', 'Power BI', 'Tableau', 'Data Engineering'],
    },
    {
      title: 'Depression Risk Analyzer',
      description: 'Machine Learning web app to predict depression risk using non-clinical survey data. Built with Python, Flask, Docker, and XGBoost. Deployed on AWS.',
      details: 'ML-powered depression risk assessment with XGBoost algorithm',
      github: 'https://github.com/lssdivya/DepressionRiskAnalyzer',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'Flask', 'XGBoost', 'Docker', 'AWS'],
    },
    {
      title: 'Research Paper Summarizer',
      description: 'This project leverages OpenAI\'s GPT API to automatically extract, summarize, and simplify academic research papers. Upload a PDF, extract the content, and receive a concise summary.',
      details: 'AI-powered research paper analysis and summarization',
      github: 'https://github.com/lssdivya/Research_Paper_Summarizer',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'OpenAI GPT', 'PDF Processing', 'NLP'],
    },
    {
      title: 'Marketing Sales Dashboard',
      description: 'An Interactive Power BI dashboard for Sales & Marketing analytics, Visualizes KPIs, trends, and actionable insights for business decision-makers.',
      details: 'Comprehensive business intelligence dashboard with KPI tracking',
      github: 'https://github.com/lssdivya/Marketing-Sales-Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Power BI', 'Data Visualization', 'Business Intelligence', 'Analytics'],
    },
    {
      title: 'Clinical Decision Making and Pattern Recognition',
      description: 'Built an intelligent Streamlit app for healthcare professionals to visualize complex patient data, uncover patterns, and make data-driven clinical decisions. The tool delivers interactive, real-time visualizations that simplify diagnosis and support evidence-based treatment planning.',
      details: 'Healthcare data visualization and pattern recognition system',
      github: 'https://github.com/lssdivya/Clinical_Decision_Making_and_Pattern_Recognition',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'Streamlit', 'Healthcare Analytics', 'Data Visualization'],
    },
    {
      title: 'ATS Checker',
      description: 'A Streamlit-powered web application that simulates how real Applicant Tracking Systems analyze resumes. Users can upload a resume and job description for instant evaluation.',
      details: 'Resume optimization tool with ATS simulation capabilities',
      github: 'https://github.com/lssdivya/ATS',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'Streamlit', 'NLP', 'Resume Analysis'],
    },
    {
      title: 'Computer-Vision-Icon-Matching',
      description: 'The Computer Vision Icon Matching project processes PDFs (Schedule and Room Plan) to identify and count matching icons using computer vision techniques. It leverages OpenCV for contour detection, preprocessing, and template matching, ensuring efficient and accurate visual component identification and analysis for document automation tasks.',
      details: 'PDF document automation with computer vision and template matching',
      github: 'https://github.com/lssdivya/Computer-Vision-Icon-Matching',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&h=400',
      gradient: 'from-blue-600 to-cyan-500',
      tech: ['Python', 'OpenCV', 'Computer Vision', 'PDF Processing', 'Template Matching'],
    },
  ];

  return (
    <section id="projects" ref={ref} className="py-20 scroll-mt-24 relative overflow-visible min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-blue-500/20 border border-gray-200/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-500/30 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-3 line-clamp-3">
                  {project.description}
                </p>
                
                <p className="text-sm font-semibold text-gray-700 mb-4">
                  {project.details}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
