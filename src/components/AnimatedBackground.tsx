import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = 150; // Increased for better density
    
    // Mouse properties
    let mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150
    };
    
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    
    // Create particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2.5 + 0.5; // Slightly larger particles
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        
        // Blue color palette with varying opacity
        const blueShade = Math.floor(Math.random() * 50) + 100; // Values between 100-150 for darker blues
        const opacity = Math.random() * 0.5 + 0.1; // Between 0.1 and 0.6
        this.color = `rgba(${blueShade/3}, ${blueShade/2}, ${blueShade}, ${opacity})`;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      
      update() {
        // Check if mouse is close enough
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          // Max distance, past that the particle will not move
          const maxDistance = 100;
          let force = (maxDistance - distance) / maxDistance;
          if (force < 0) force = 0;
          
          let directionX = (forceDirectionX * force * this.density) * 0.8;
          let directionY = (forceDirectionY * force * this.density) * 0.8;
          
          if (distance < mouse.radius + this.size) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx/10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy/10;
            }
          }
        }
      }
    }
    
    // Create particle array
    function init() {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
      }
    }
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connect();
    }
    
    // Connect close particles with lines
    function connect() {
      let opacity = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) { // Reduced distance for more delicate connections
            opacity = 1 - (distance / 100);
            // More vibrant blue connections
            ctx.strokeStyle = `rgba(50, 100, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
      });
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};

export default AnimatedBackground;
