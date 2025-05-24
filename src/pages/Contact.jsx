import React, { useEffect } from 'react';
import Contact from '../components/sections/Contact';
import CosmoParticles from '../components/common/CosmoParticles';
import FadeIn from '../components/animations/FadeIn';

const ContactPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact <span className="cosmic-text">Us</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </FadeIn>
        </div>
      </section>
      
      {/* Contact section */}
      <Contact />
    </>
  );
};

export default ContactPage;