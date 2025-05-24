import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CosmoParticles from '../components/common/CosmoParticles';
import Button from '../components/common/Button';

const NotFound = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden py-20">
      {/* Background particles effect */}
      <CosmoParticles count={100} opacity={0.5} />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-4xl opacity-10">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Decorative circles */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#cosmicGradient)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#cosmicGradient)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#cosmicGradient)" strokeWidth="0.5" />
            
            {/* Grid lines */}
            <g stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.2">
              {[...Array(10)].map((_, i) => (
                <React.Fragment key={`grid-${i}`}>
                  <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
                  <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                </React.Fragment>
              ))}
            </g>
            
            <defs>
              <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Text */}
            <h1 className="text-8xl md:text-9xl font-display font-bold">
              <span className="cosmic-text">4</span>
              <span className="text-white">0</span>
              <span className="cosmic-text">4</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-6">
              Lost in the Cosmic Void
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              It seems you've ventured into uncharted space. The page you're looking for doesn't exist or has been moved to another dimension.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button to="/" variant="primary">
                Return to Home
              </Button>
              <Button to="/contact" variant="outline">
                Contact Support
              </Button>
            </div>
          </motion.div>
          
          {/* Animated planet */}
          <motion.div 
            className="mt-16 relative"
            initial={{ y: 20 }}
            animate={{ y: -20 }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-xl"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-blue-300/50"></div>
                <div className="absolute bottom-6 right-4 w-3 h-3 rounded-full bg-purple-300/50"></div>
              </div>
              
              {/* Orbit */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-blue-500/20 rounded-full"></div>
              
              {/* Satellite */}
              <motion.div
                className="absolute"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ 
                  width: '40px', 
                  height: '40px',
                  top: 'calc(50% - 20px)',
                  left: 'calc(50% - 20px)',
                  transformOrigin: 'center' 
                }}
              >
                <div 
                  className="absolute w-3 h-3 bg-white rounded-full"
                  style={{ 
                    left: 'calc(100% + 16px)',
                    top: 'calc(50% - 1.5px)'
                  }}
                ></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;