import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import ProjectCostEstimator from "../sections/ProjectCostEstimator";

// Import your SVG file as a React component
//import { ReactComponent as CosmicLogo } from "/assets/cosmic_logo.svg";

// Alternative import method if the above doesn't work:
import cosmic_logo from "/assets/cosmic_logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock/unlock body scroll when mobile menu or estimator is open
  useEffect(() => {
    if (isMobileMenuOpen || isEstimatorOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isEstimatorOpen]);

  // Toggle estimator modal
  const toggleEstimator = () => {
    setIsEstimatorOpen(!isEstimatorOpen);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Main navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50"
            : "py-6 lg:py-8"
        }`}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo with your SVG file */}
            <Link to="/" className="flex items-center space-x-3 z-10 group">
              <motion.div
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group-hover:scale-110 transition-transform duration-300"
              >
                {/* Method 1: Using ReactComponent import */}
                {/* <CosmicLogo className="w-8 h-8 md:w-10 md:h-10 text-blue-400" /> */}

                {/* Method 2: If ReactComponent doesn't work, use img tag */}
                <img
                  src={cosmic_logo}
                  alt="Cosmic Stack Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-base font-display font-bold"
              >
                <span className="cosmic-text">the</span>
                <span className="text-white">cosmic</span>
                <span className="cosmic-text">stack</span>
              </motion.div>
            </Link>

            {/* Mobile: Menu button and Estimator button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                onClick={toggleEstimator}
                className="flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40"
                aria-label="Project Estimator"
              >
                <FiSettings className="mr-1" size={16} />
                <span>Estimator</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/80 text-slate-300 hover:text-white transition-colors z-10"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-5 h-5" />
                ) : (
                  <HiMenuAlt3 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-2 text-base font-medium ${
                      isActive
                        ? "text-blue-400"
                        : "text-slate-300 hover:text-white transition-colors"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                          layoutId="navbar-indicator"
                          transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop: Contact button and Estimator button */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={toggleEstimator}
                className="flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 transition-colors"
              >
                <FiSettings className="mr-2" />
                Project Estimator
              </button>

              <Link to="/contact" className="cosmic-button">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-slate-900 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mx-auto px-6 sm:px-8 py-32 flex-1 flex flex-col">
              {/* Mobile Logo */}
              <motion.div
                className="flex items-center space-x-3 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CosmicLogo className="w-12 h-12 text-blue-400" />
                <div className="text-2xl font-display font-bold">
                  <span className="cosmic-text">the</span>
                  <span className="text-white">cosmic</span>
                  <span className="cosmic-text">stack</span>
                </div>
              </motion.div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-3xl font-display font-bold ${
                          isActive
                            ? "text-blue-400"
                            : "text-slate-200 hover:text-blue-400 transition-colors"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Project Estimator Button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={toggleEstimator}
                  className="w-full py-3 px-4 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center text-lg font-medium"
                >
                  <FiSettings className="mr-2" />
                  Project Estimator
                </button>
              </motion.div>

              {/* Contact button */}
              <motion.div
                className="mt-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Link
                  to="/contact"
                  className="cosmic-button inline-block w-full py-4 text-center text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start a project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Cost Estimator Modal */}
      <AnimatePresence>
        {isEstimatorOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEstimatorOpen(false)}
            ></motion.div>

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
                onClick={() => setIsEstimatorOpen(false)}
              >
                <HiX size={20} />
              </button>

              <ProjectCostEstimator />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
