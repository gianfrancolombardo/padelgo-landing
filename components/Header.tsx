import React from 'react';

const Header: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-[#1A1D1A]/80 backdrop-blur-sm border-b border-transparent">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Padel <span className="text-[#3BFF76]">GO</span>
        </h1>
        <nav>
          <ul className="hidden md:flex items-center gap-8">
            <li><a href="#problema" onClick={handleNavClick} className="text-base text-[#B0B0B0] hover:text-white transition-colors duration-300">El Problema</a></li>
            <li><a href="#solucion" onClick={handleNavClick} className="text-base text-[#B0B0B0] hover:text-white transition-colors duration-300">La Solución</a></li>
            <li><a href="#beneficios" onClick={handleNavClick} className="text-base text-[#B0B0B0] hover:text-white transition-colors duration-300">Beneficios</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;