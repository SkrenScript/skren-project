import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Zap, Code, Terminal, Shield, Database, Settings } from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Optimized for performance with near-instantaneous results and minimal resource usage.',
    icon: Zap
  },
  {
    title: 'Advanced Code Analysis',
    description: 'Deep insights into your codebase with smart suggestions and optimizations.',
    icon: Code
  },
  {
    title: 'CLI Integration',
    description: 'Seamlessly integrate with your existing terminal workflows and build systems.',
    icon: Terminal
  },
  {
    title: 'Secure By Design',
    description: 'Built with security in mind to protect your sensitive code and data.',
    icon: Shield
  },
  {
    title: 'Data Visualization',
    description: 'Beautiful, interactive visualizations of your code metrics and patterns.',
    icon: Database
  },
  {
    title: 'Fully Customizable',
    description: 'Tailor every aspect to match your team\'s workflow and preferences.',
    icon: Settings
  }
];

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add('dark');
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative">
        <Hero />
        
        <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in">
                Powerful Developer Tools
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Everything you need to accelerate your development workflow
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass-panel p-8 md:p-12 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to supercharge your development?</h2>
                  <p className="text-gray-300 mb-6">
                    Join thousands of developers who use Skren Utils to build better software, faster.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#pricing" 
                    className="glass-button px-6 py-3 text-base font-medium text-white shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-300"
                  >
                    View Pricing
                  </a>
                  <a 
                    href="#trial" 
                    className="px-6 py-3 border border-primary/50 hover:border-primary text-base font-medium text-white rounded-lg bg-transparent hover:bg-primary/10 transition-all duration-300"
                  >
                    Start Free Trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center space-x-2 mb-6">
                <span className="text-2xl font-bold text-gradient">Skren</span>
                <span className="text-2xl font-light text-white">Utils</span>
              </a>
              <p className="text-gray-400 text-sm">
                Powerful developer tools to streamline your workflow.
              </p>
              <div className="mt-4 flex space-x-4">
                {['Twitter', 'GitHub', 'Discord'].map((social) => (
                  <a 
                    key={social} 
                    href={`#${social.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            {['Product', 'Resources', 'Company'].map((category) => (
              <div key={category}>
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${category.toLowerCase()}-${item}`} 
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {`${category} Link ${item}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Skren Utils. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
