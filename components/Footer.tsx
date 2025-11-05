import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-[#2a2d2a]">
      <div className="container mx-auto px-4 text-center text-[#B0B0B0]">
        <p>&copy; {new Date().getFullYear()} Padel GO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
