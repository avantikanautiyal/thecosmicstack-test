/**
 * Theme related utility functions
 */

// Color palette for the cosmic theme
export const colors = {
    // Primary colors
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Secondary colors
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    
    // Accent colors
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    
    // Neutral colors
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    }
  };
  
  // Cosmic gradients
  export const gradients = {
    primary: 'linear-gradient(to right, #3b82f6, #8b5cf6, #6366f1)',
    secondary: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
    accent: 'linear-gradient(to right, #3b82f6, #14b8a6, #22c55e)',
    dark: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
  };
  
  // Shadow styles
  export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    cosmic: '0 4px 20px rgba(59, 130, 246, 0.2)',
    glow: '0 0 15px rgba(59, 130, 246, 0.5)',
  };
  
  // Font settings
  export const fonts = {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'Space Grotesk, Inter, ui-sans-serif, system-ui',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  };
  
  // Z-index values
  export const zIndex = {
    negative: -1,
    elevate: 1,
    dropdown: 10,
    sticky: 100,
    header: 200,
    tooltip: 300,
    modal: 400,
  };
  
  // Generate a cosmic text style
  export const cosmicTextStyle = (dark = true) => ({
    background: gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
  });
  
  // Generate a cosmic border style
  export const cosmicBorderStyle = (dark = true) => ({
    border: `1px solid ${dark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.5)'}`,
    borderRadius: '0.5rem',
    backdropFilter: 'blur(8px)',
  });
  
  // Generate a cosmic card style
  export const cosmicCardStyle = (dark = true) => ({
    background: dark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    ...cosmicBorderStyle(dark),
    boxShadow: shadows.cosmic,
    padding: '1.5rem',
    borderRadius: '0.75rem',
  });