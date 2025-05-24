import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5,
  className = '',
  once = true
}) => {
  // Define animation variants based on direction
  const getVariants = () => {
    const distance = 50;
    const variants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration,
          delay
        }
      }
    };

    // Add directional movement
    switch (direction) {
      case 'up':
        variants.hidden.y = distance;
        variants.visible.y = 0;
        break;
      case 'down':
        variants.hidden.y = -distance;
        variants.visible.y = 0;
        break;
      case 'left':
        variants.hidden.x = distance;
        variants.visible.x = 0;
        break;
      case 'right':
        variants.hidden.x = -distance;
        variants.visible.x = 0;
        break;
      default:
        break;
    }

    return variants;
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;