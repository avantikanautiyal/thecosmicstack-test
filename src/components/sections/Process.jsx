import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { 
  FiSearch,
  FiEdit3,
  FiCode,
  FiCheckCircle,
  FiRefreshCw,
  FiActivity
} from 'react-icons/fi';

const Process = () => {
  const processes = [
    {
      id: 1,
      icon: <FiSearch />,
      title: 'Discovery',
      description: 'We research your goals, target audience, and market position to develop a strategic approach.'
    },
    {
      id: 2,
      icon: <FiEdit3 />,
      title: 'Design',
      description: 'Our team creates intuitive interfaces and experiences tailored to your brand and users.'
    },
    {
      id: 3,
      icon: <FiCode />,
      title: 'Development',
      description: 'We build your solution using cutting-edge technologies for optimal performance and scalability.'
    },
    {
      id: 4,
      icon: <FiCheckCircle />,
      title: 'Testing',
      description: 'Rigorous quality assurance ensures your product is reliable, secure, and user-friendly.'
    },
    {
      id: 5,
      icon: <FiActivity />,
      title: 'Launch',
      description: 'Your product goes live with our support to ensure a smooth and successful deployment.'
    },
    {
      id: 6,
      icon: <FiRefreshCw />,
      title: 'Iteration',
      description: 'We continue to improve and evolve your product based on user feedback and performance data.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Cosmic particles background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
            Our Methodology
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="cosmic-text">Streamlined</span> Process
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We follow a proven development process to transform your ideas into exceptional digital experiences 
            efficiently and effectively.
          </p>
        </FadeIn>

        {/* Mobile-only timeline view */}
        <div className="md:hidden relative max-w-md mx-auto">
          {/* Connecting vertical line */}
          <div className="absolute left-16 ml-px top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-indigo-500/50"></div>
          
          {/* Process steps - Mobile timeline layout */}
          {processes.map((process, index) => (
            <FadeIn 
              key={process.id}
              className="mb-16 last:mb-0 relative"
              delay={index * 0.1}
            >
              <div className="flex items-start">
                {/* Icon circle with number */}
                <div className="flex-shrink-0 relative mr-8">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl relative z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    {process.icon}
                  </motion.div>
                  <div className="absolute w-16 h-16 -left-2 -top-2 bg-blue-500/10 rounded-full animate-pulse-slow"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <motion.div 
                    className="bg-slate-900/80 p-4 rounded-lg border border-blue-500/20 backdrop-blur-sm"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <span className="text-purple-400 mr-2">{process.id}.</span> 
                      <span className="text-white">{process.title}</span>
                    </h3>
                    <p className="text-slate-400 text-sm">{process.description}</p>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop Process timeline - exactly as original */}
        <div className="relative max-w-4xl mx-auto hidden md:block">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-full"></div>
          
          {/* Process steps */}
          {processes.map((process, index) => (
            <FadeIn 
              key={process.id}
              className="mb-12 last:mb-0"
              delay={index * 0.1}
            >
              <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="w-1/2 px-6">
                  <motion.div 
                    className="cosmic-card"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      <span className="cosmic-text mr-2">{process.id}.</span> {process.title}
                    </h3>
                    <p className="text-slate-400">{process.description}</p>
                  </motion.div>
                </div>
                
                {/* Icon */}
                <div className="relative flex items-center justify-center z-10">
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl relative z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                  >
                    {process.icon}
                  </motion.div>
                  <div className="absolute w-20 h-20 bg-blue-500/10 rounded-full animate-pulse-slow"></div>
                </div>
                
                {/* Empty space for alignment */}
                <div className="w-1/2"></div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;