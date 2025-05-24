import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  delay = 0
}) => {
  return (
    <motion.div
      className={`cosmic-card ${hoverEffect ? 'hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export default Card;