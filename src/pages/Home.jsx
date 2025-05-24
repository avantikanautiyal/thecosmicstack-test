import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Projects from '../components/sections/Projects';
import About from '../components/sections/About';
import Team from '../components/sections/Team';
import Contact from '../components/sections/Contact';
import CosmoParticles from '../components/common/CosmoParticles';

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Background particles effect */}
      <CosmoParticles count={70} opacity={0.3} />
      
      {/* Main sections */}
      <Hero />
      <Services />
      <Process />
      <Projects />
      <About />
      <Team />
      <Contact />
    </>
  );
};

export default Home;