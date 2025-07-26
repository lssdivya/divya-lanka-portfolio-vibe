
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, LucideIcon } from 'lucide-react';

interface ContactLink {
  icon: LucideIcon;
  label: string;
  url: string;
  color: string;
}

interface ContactLinksProps {
  inView: boolean;
}

const ContactLinks: React.FC<ContactLinksProps> = ({ inView }) => {
  const contactLinks: ContactLink[] = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/lssdivya',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/divyaa-l',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:Lss.divya27@gmail.com',
      color: 'from-blue-600 to-blue-500',
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-blue-500/20 border border-gray-200 hover:shadow-blue-500/40 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Connect with me
        </span>
      </h3>
      
      <div className="space-y-4">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, x: 10 }}
            className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-200"
          >
            <link.icon size={24} />
            <span className="font-semibold">{link.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactLinks;
