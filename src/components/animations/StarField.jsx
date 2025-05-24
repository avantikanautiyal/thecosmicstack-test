import React, { useRef, useEffect } from 'react';

const StarField = ({ 
  starCount = 100, 
  starSize = { min: 1, max: 3 },
  starSpeed = { min: 0.1, max: 0.3 },
  className = ''
}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    // Handle resize
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();

    // Create star
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (starSize.max - starSize.min) + starSize.min;
        this.speed = Math.random() * (starSpeed.max - starSpeed.min) + starSpeed.min;
        this.brightness = Math.random();
        this.color = `rgba(255, 255, 255, ${this.brightness})`;
      }

      update() {
        // Move stars from top to bottom
        this.y += this.speed;
        
        // Reset position when star reaches bottom
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize stars
    const init = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, starSize, starSpeed]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
    />
  );
};

export default StarField;