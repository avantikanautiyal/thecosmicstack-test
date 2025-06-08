// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import VideoLoader from '../components/common/VideoLoader';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Projects from '../components/sections/Projects';
import About from '../components/sections/About';
import Team from '../components/sections/Team';
import Contact from '../components/sections/Contact';
import CosmoParticles from '../components/common/CosmoParticles';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading && <VideoLoader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div>
          <CosmoParticles count={70} opacity={0.3} />
          <Hero />
          <Services />
          <Process />
          <Projects />
          <About />
          <Team />
          <Contact />
        </div>
      )}
    </>
  );
};

export default Home;
