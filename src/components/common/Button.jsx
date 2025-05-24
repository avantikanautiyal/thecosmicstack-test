import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  ...props 
}) => {
  // Determine button styles based on variant and size
  const getButtonClasses = () => {
    let baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ';
    
    // Size classes
    const sizeClasses = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2.5',
      lg: 'px-8 py-3 text-lg'
    };
    
    // Variant classes
    const variantClasses = {
      primary: 'cosmic-button',
      outline: 'cosmic-button-outline',
      ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white'
    };
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };
  
  // Determine the correct element type based on props
  const renderButton = () => {
    const buttonProps = {
      className: getButtonClasses(),
      onClick,
      ...props
    };
    
    if (to) {
      return <Link to={to} {...buttonProps}>{children}</Link>;
    } else if (href) {
      return <a href={href} {...buttonProps}>{children}</a>;
    } else {
      return <button {...buttonProps}>{children}</button>;
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {renderButton()}
    </motion.div>
  );
};

export default Button;