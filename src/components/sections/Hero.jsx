import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import TextGlitch from '../animations/TextGlitch';
import StarField from '../animations/StarField';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <StarField starCount={150} />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="text-center lg:text-left" variants={itemVariants}>
            <motion.div 
              className="mb-6 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20">
                Software Development & Web Design
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="block">Develop</span>
              <TextGlitch
                text="Beyond The Stars"
                className="cosmic-text mt-2"
                glitchInterval={80}
                glitchDuration={1500}
                fontSize="text-4xl md:text-5xl lg:text-6xl"
              />
            </motion.h1>
            
            <motion.p 
              className="text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Creating cutting-edge web and mobile solutions that transform your vision into powerful, 
              responsive, and user-friendly digital experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Button to="/contact" size="lg">Get Started</Button>
              <Button to="/portfolio" variant="outline" size="lg">View Our Work</Button>
            </motion.div>
          </motion.div>
          
          {/* Hero Image/Animation */}
          <motion.div
            className="order-first lg:order-last"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Glowing orb effect */}
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl"></div>
              
              {/* Main illustration */}
              <motion.div 
                className="relative bg-slate-900/70 cosmic-border rounded-2xl p-6 aspect-square max-w-md mx-auto overflow-hidden backdrop-blur-sm"
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <g stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" fill="none">
                      {[...Array(20)].map((_, i) => (
                        <React.Fragment key={`grid-${i}`}>
                          <line x1="0" y1={i * 10} x2="200" y2={i * 10} />
                          <line x1={i * 10} y1="0" x2={i * 10} y2="200" />
                        </React.Fragment>
                      ))}
                    </g>
                    
                    {/* Planet */}
                    <circle cx="100" cy="100" r="40" fill="url(#cosmicGradient)" />
                    
                    {/* Rings */}
                    <ellipse cx="100" cy="100" rx="70" ry="20" 
                      fill="none" 
                      stroke="url(#cosmicGradient)" 
                      strokeWidth="1"
                      strokeOpacity="0.6" 
                      transform="rotate(30, 100, 100)" 
                    />
                    
                    {/* Orbit */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
                    
                    {/* Satellite */}
                    <motion.g
                      animate={{ 
                        rotate: 360
                      }}
                      transition={{ 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      style={{ originX: 0.5, originY: 0.5 }}
                    >
                      <circle cx="190" cy="100" r="5" fill="#f472b6" />
                    </motion.g>
                    
                    {/* Stars */}
                    {[...Array(30)].map((_, i) => {
                      const x = Math.random() * 200;
                      const y = Math.random() * 200;
                      const size = Math.random() * 2 + 0.5;
                      return (
                        <motion.circle 
                          key={`star-${i}`}
                          cx={x} 
                          cy={y} 
                          r={size} 
                          fill="white"
                          initial={{ opacity: Math.random() * 0.7 + 0.3 }}
                          animate={{ opacity: Math.random() * 0.3 + 0.1 }}
                          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatType: "reverse" }}
                        />
                      );
                    })}
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-sm mb-2">Scroll to explore</span>
            <motion.div 
              className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center p-1"
              initial={{ opacity: 0.6 }}
            >
              <motion.div 
                className="w-1 h-2 bg-blue-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;