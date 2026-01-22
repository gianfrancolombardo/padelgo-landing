import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 animate-slide-down" style={{ animationDelay: '0s' }}>
          <span className="text-2xl font-display tracking-widest text-white cursor-pointer select-none">
            VOLEA<span className="text-volea-green">BOX</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <a href="#problema" className="text-sm font-light tracking-wide text-gray-300 hover:text-white transition-colors">PROBLEMA</a>
          <a href="#solucion" className="text-sm font-light tracking-wide text-gray-300 hover:text-white transition-colors">SOLUCIÓN</a>
          <a href="#beneficios" className="text-sm font-light tracking-wide text-gray-300 hover:text-white transition-colors">BENEFICIOS</a>
        </nav>

        <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-volea-green hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-slide-down" style={{ animationDelay: '0.2s' }}>
          WAITLIST
        </button>
      </div>
    </header>
  );
};

export default Header;