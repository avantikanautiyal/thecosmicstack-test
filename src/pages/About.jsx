import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/animations/FadeIn';
import Team from '../components/sections/Team';
import CosmoParticles from '../components/common/CosmoParticles';
import { FiCheckCircle, FiTrendingUp, FiUsers, FiStar } from 'react-icons/fi';

const About = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    {
      id: 1,
      year: '2025',
      title: 'Cosmic Beginnings',
      description: 'TheCosmicStack was founded by a group of young developers with a vision to create cutting-edge digital solutions.'
    },
  ];

  const values = [
    {
      id: 1,
      icon: <FiCheckCircle className="w-6 h-6 text-blue-400" />,
      title: 'Quality First',
      description: 'We never compromise on quality, ensuring every line of code and every pixel is crafted with precision and care.'
    },
    {
      id: 2,
      icon: <FiTrendingUp className="w-6 h-6 text-purple-400" />,
      title: 'Continuous Innovation',
      description: 'We stay at the forefront of technology, constantly learning and adopting new tools and methodologies.'
    },
    {
      id: 3,
      icon: <FiUsers className="w-6 h-6 text-indigo-400" />,
      title: 'Client Partnership',
      description: 'We view our clients as partners, working collaboratively to achieve their goals and exceed their expectations.'
    },
    {
      id: 4,
      icon: <FiStar className="w-6 h-6 text-blue-400" />,
      title: 'Impact Driven',
      description: 'We measure our success by the positive impact our work has on our clients businesses and their users.'
    }
  ];

  return (
    <>
      {/* Background particles effect */}
      <CosmoParticles count={70} opacity={0.3} />
      
      {/* Hero section */}
      <section className="pt-32 pb-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="cosmic-text">TheCosmicStack</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              We're a team of passionate technologists creating digital experiences that are truly out of this world.
            </p>
          </FadeIn>
          
          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <FadeIn direction="right">
              <div className="cosmic-card h-full">
                <div className="p-3 bg-blue-500/20 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-slate-400">
                  To empower businesses through innovative technology solutions that drive growth, enhance user experiences, 
                  and solve complex problems. We strive to be at the forefront of digital transformation, delivering 
                  solutions that are not just functional but exceptional.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn direction="left">
              <div className="cosmic-card h-full">
                <div className="p-3 bg-purple-500/20 rounded-lg inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-slate-400">
                  To be recognized globally as a leader in digital innovation, known for creating solutions that push 
                  the boundaries of what's possible. We envision a world where technology enhances human potential, 
                  and we aim to be at the center of that transformation.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Company values */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="cosmic-text">Values</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              These core principles guide everything we do, from how we develop software to how we interact with clients.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeIn key={value.id} delay={index * 0.1}>
                <div className="cosmic-card h-full">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-slate-400">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our journey / milestones */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="cosmic-text">Milestones</span> Along The Way
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From our humble beginnings to where we are today, these are the key moments that shaped our company.
            </p>
          </FadeIn>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-indigo-500/30"></div>
            
            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <FadeIn key={milestone.id} delay={index * 0.1}>
                <div className={`flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className="w-1/2 px-6">
                    <motion.div 
                      className="cosmic-card"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm font-medium cosmic-text mb-1">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-slate-400">{milestone.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Year circle */}
                  <div className="relative flex items-center justify-center z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center text-white font-bold relative z-10"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {milestone.year}
                    </motion.div>
                    <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full animate-pulse-slow"></div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="w-1/2"></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <Team />
    </>
  );
};

export default About;