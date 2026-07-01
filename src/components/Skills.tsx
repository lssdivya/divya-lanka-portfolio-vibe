import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaPython,
  FaJava,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaMicrosoft,
  FaCode,
  FaBrain,
  FaDatabase,
  FaServer,
  FaCloud,
  FaChartLine,
} from 'react-icons/fa';

interface SkillsProps {
  setActiveSection: (section: string) => void;
}

const Skills: React.FC<SkillsProps> = ({ setActiveSection }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (inView) setActiveSection('skills');
    },
  });

  const skillGroups = [
    {
      title: 'Programming Languages',
      skills: ['Python', 'Java', 'SQL', 'TypeScript', 'Bash'],
      headerIcon: FaCode,
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      skills: [
        'PyTorch', 'TensorFlow', 'Scikit-learn', 'LLMs', 'RAG', 'AI Agents',
        'Multi-Agent Systems', 'Agent Orchestration', 'LangGraph', 'MCP',
        'Function Calling', 'Prompt Engineering', 'LLM Evaluation',
        'LLM-as-a-Judge', 'Hallucination Detection', 'Semantic Search',
        'Embeddings', 'Semantic Chunking', 'Reranking', 'Vector Search',
        'Fine-tuning', 'RLHF', 'Synthetic Data Generation',
      ],
      headerIcon: FaBrain,
    },
    {
      title: 'Data Engineering & Storage',
      skills: [
        'Apache Spark', 'PySpark', 'Databricks', 'Apache Kafka', 'Delta Lake',
        'Snowflake', 'PostgreSQL', 'Redis', 'Vector Databases', 'Feature Stores',
        'Azure Data Lake', 'Amazon S3', 'Data Pipelines', 'ETL',
      ],
      headerIcon: FaDatabase,
    },
    {
      title: 'Backend & API Development',
      skills: [
        'FastAPI', 'REST APIs', 'gRPC', 'Microservices',
        'Event-Driven Architecture', 'Enterprise Connectors',
        'Jira API', 'Slack API', 'WebSockets',
      ],
      headerIcon: FaServer,
    },
    {
      title: 'Cloud, DevOps & MLOps',
      skills: [
        'AWS EKS', 'AWS ECS', 'AWS Lambda', 'SageMaker', 'S3', 'API Gateway',
        'IAM', 'Secrets Manager', 'CloudWatch', 'Microsoft Azure',
        'Azure ML', 'Azure Data Factory', 'Docker', 'Kubernetes',
        'GitHub Actions', 'Azure DevOps', 'MLflow', 'CI/CD', 'Terraform',
      ],
      headerIcon: FaCloud,
    },
    {
      title: 'Monitoring & Infrastructure',
      skills: [
        'Prometheus', 'Grafana', 'OpenTelemetry', 'ELK Stack',
        'Distributed Systems', 'Distributed Inference', 'Ray', 'Caching',
        'Performance Optimization', 'Workload Scheduling', 'Autoscaling',
        'GPU Scheduling',
      ],
      headerIcon: FaChartLine,
    },
    {
      title: 'Databases & Enterprise Platforms',
      skills: [
        'PostgreSQL', 'Redis', 'Snowflake', 'Databricks', 'Vector Databases',
        'Enterprise Knowledge Systems', 'Document Repositories',
      ],
      headerIcon: FaDatabase,
    },
  ];

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-500/20 border border-gray-200/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <group.headerIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: (groupIndex * 0.05) + (index * 0.02) }}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
