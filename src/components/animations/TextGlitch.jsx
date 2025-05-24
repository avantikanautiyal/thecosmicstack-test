import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TextGlitch = ({ 
  text, 
  className = '', 
  glitchIntensity = 0.2,
  glitchInterval = 100,
  glitchDuration = 2000,
  isActive = true,
  onHover = false,
  fontSize = 'text-2xl',
  textColor = 'text-white'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Characters to use for glitch effect
  const glitchChars = '!<>-_*+#@?=^~01';
  
  useEffect(() => {
    let glitchTimer;
    let intervalId;
    
    const startGlitch = () => {
      setIsGlitching(true);
      
      // Create glitch effect
      intervalId = setInterval(() => {
        setDisplayText(prevText => {
          // Determine which characters to glitch
          const textArray = text.split('');
          for (let i = 0; i < textArray.length; i++) {
            // Randomly decide if this character should glitch
            if (Math.random() < glitchIntensity) {
              // Replace with a random glitch character
              const randomIndex = Math.floor(Math.random() * glitchChars.length);
              textArray[i] = glitchChars[randomIndex];
            }
          }
          return textArray.join('');
        });
      }, glitchInterval);
      
      // Set timeout to stop glitching
      glitchTimer = setTimeout(() => {
        clearInterval(intervalId);
        setDisplayText(text);
        setIsGlitching(false);
      }, glitchDuration);
    };
    
    // Determine when to glitch
    if ((isActive && !onHover) || (onHover && isHovering)) {
      startGlitch();
    }
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearTimeout(glitchTimer);
    };
  }, [text, isActive, onHover, isHovering, glitchIntensity, glitchInterval, glitchDuration]);
  
  return (
    <motion.span
      className={`inline-block ${fontSize} ${textColor} font-mono ${className}`}
      onMouseEnter={() => onHover && setIsHovering(true)}
      onMouseLeave={() => onHover && setIsHovering(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

export default TextGlitch;