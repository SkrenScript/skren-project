import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const terminalLines = [
    { text: 'container@skrenutils~ Discord bot starting...', color: '#f59e0b' },
    { text: '[Bot Daemon]: Initializing bot container.', color: '#ffffff' },
    { text: '[bot-monitor] Connecting to Discord API...', color: '#10b981' },
    { text: '[bot-monitor] Bot authenticated and commands loaded.', color: '#10b981' },
    { text: '[bot-monitor] Checking database connection...', color: '#10b981' },
    { text: '[bot-monitor] Database connected successfully.', color: '#10b981' },
    { text: '[bot-monitor] Listening for commands and events.', color: '#10b981' },
    { text: '[bot-monitor] Bot is online! Access it [here].', color: '#10b981' },
    { text: '[20:25:10][✓] Discord Bot Fully Started!', color: '#10b981', background: '#10b98133' }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const childElements = headingRef.current?.querySelectorAll('span');
    childElements?.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      childElements?.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  // Typing animation for terminal
  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, terminalLines.length]);
  
  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left space-y-8">
          <h1 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white"
          >
            <span className="block" style={{ animationDelay: '0.2s' }}>
              Powerful Developer Utils
            </span>
            <span className="block text-gradient-blue" style={{ animationDelay: '0.5s' }}>
              Made for Developers
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto lg:mx-0 text-xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Streamline your workflow with our suite of premium developer tools. 
            Build faster, debug smarter, and ship with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <a 
              href="#get-started" 
              className="glass-button inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white shadow-lg hover:shadow-primary/20 transform hover:translate-y-[-2px] transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#documentation" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-primary bg-transparent hover:bg-primary/10 transition-colors duration-300 rounded-lg"
            >
              Documentation
            </a>
          </div>
        </div>
        
        {/* Terminal/Code Editor Component */}
        <div className="animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <div className="glass-panel rounded-lg overflow-hidden shadow-xl border border-white/10">
            <div className="flex items-center justify-between p-3 bg-black/40 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Terminal className="w-4 h-4 mr-2" />
                <span>skren-terminal</span>
              </div>
              <div className="w-16"></div> {/* Empty div for flex spacing */}
            </div>
            <div className="bg-black/60 backdrop-blur-sm p-4 font-mono text-sm h-[320px] overflow-y-auto">
              {terminalLines.slice(0, currentLineIndex).map((line, index) => (
                <div 
                  key={index} 
                  className={`py-1 px-2 rounded ${line.background ? '' : ''}`}
                  style={{ 
                    color: line.color,
                    backgroundColor: line.background || 'transparent' 
                  }}
                >
                  {line.text}
                </div>
              ))}
              {currentLineIndex < terminalLines.length && (
                <span className={`inline-block w-3 h-5 bg-white/70 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 pt-12 animate-fade-in" style={{ animationDelay: '1.3s' }}>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <a href="#features" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300">
          <span className="text-sm mb-2">Discover our features</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
