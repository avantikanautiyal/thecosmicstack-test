import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import cosmic_logo from '/assets/cosmic_logo.svg'; // Adjust path if needed

const CosmicStackLoader = ({ onComplete, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const wordRefs = useRef([]);

  const setWordRef = (el, index) => {
    wordRefs.current[index] = el;
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in loader and animate logo
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        logoRef.current,
        { y: -30, scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.1'
      );

    // Animate each word with advanced effects
    wordRefs.current.forEach((ref, i) => {
      tl.fromTo(
        ref,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          skewY: 10,
          rotate: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          skewY: 0,
          rotate: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        },
        `-=${0.8 - i * 0.2}` // slight overlap
      );
    });

    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
        <img
          ref={logoRef}
          src={cosmic_logo}
          alt="Cosmic Stack Logo"
          className="w-16 sm:w-20 h-auto animate-float"
        />
        <h1 className="text-3xl sm:text-4xl font-display font-bold flex">
          <span
            ref={(el) => setWordRef(el, 0)}
            className="text-[#7A6FF0]"
          >
            the
          </span>
          <span
            ref={(el) => setWordRef(el, 1)}
            className="text-white"
          >
            cosmic
          </span>
          <span
            ref={(el) => setWordRef(el, 2)}
            className="bg-gradient-to-r from-[#6C63FF] via-[#8A6FE2] to-[#A167E6] bg-clip-text text-transparent animate-shimmer"
          >
            stack
          </span>
        </h1>
      </div>
    </div>
  );
};

export default CosmicStackLoader;
