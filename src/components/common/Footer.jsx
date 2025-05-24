import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900/80 pt-16 pb-8 backdrop-blur-sm border-t border-blue-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-display font-bold">
                <span className="cosmic-text">the</span>
                <span className="text-white">cosmic</span>
                <span className="cosmic-text">stack</span>
              </h2>
            </Link>
            <p className="text-slate-400 mb-6">
              Innovative software solutions that are out of this world. We
              develop cutting-edge web applications, mobile apps, and provide
              comprehensive digital services.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/the-cosmic-stack/"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/thecosmicstack"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-display font-medium mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "About", "Blog", "Services", "Portfolio", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-display font-medium mb-6 text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                'Web Development', 
                'UI/UX Design', 
                'Product Development',
                'Cloud Solutions',
                'AI/ML Integration'
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-display font-medium mb-6 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-blue-400" />
                <span className="text-slate-400">
                  Noida, Uttar Pradesh, India. (201305)
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-blue-400" />
                <a
                  href="tel:+1234567890"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  (+91)8126931789, (+91)7505672873
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-blue-400" />
                <a
                  href="mailto:thecosmicstack@gmail.com"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  thecosmicstack@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-900/30 to-transparent my-8"></div>

        {/* Copyright */}
        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm text-center md:text-left">
          <p>&copy; {currentYear} TheCosmicStack. All rights reserved.</p>

          <div className="flex items-center mt-4 md:mt-0">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 py-2 px-4 rounded-full border border-blue-500/30 bg-slate-800/50 text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              Back to top
              <svg
                className="h-4 w-4 transform group-hover:-translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;