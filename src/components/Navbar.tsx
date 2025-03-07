import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gradient">Skren</span>
              <span className="text-2xl font-light text-white">Utils</span>
            </a>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {['Features', 'AI', 'Utils', 'Blog', 'Discord'].map(item => <li key={item} className="relative group">
                  <a href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 py-0 px-[20px]">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>)}
            </ul>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300">
              Log in
            </a>
            <a href="/login" className="glass-button px-4 py-2 text-sm font-medium text-white hover:text-white">
              Get Started
            </a>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-y-0 right-0 z-40 w-full bg-background/95 backdrop-blur-lg`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="mt-8">
            <ul className="space-y-6">
              {['Features', 'AI', 'Utils', 'Blog', 'Discord'].map(item => <li key={item} className="animate-slide-in">
                  <a href={`#${item.toLowerCase()}`} className="text-xl font-medium text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>
                    {item}
                  </a>
                </li>)}
            </ul>
          </nav>
          
          <div className="mt-auto space-y-4 pt-8">
            <a href="/login" className="block w-full text-center py-3 text-gray-300 hover:text-white transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>
              Log in
            </a>
            <a href="/login" className="block w-full text-center glass-button py-3 text-white" onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>;
};

export default Navbar;
