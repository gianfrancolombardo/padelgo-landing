import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#050505]">
      <div className="max-w-[1440px] mx-auto px-6 text-center text-gray-500 font-light text-sm">
        <p>&copy; {new Date().getFullYear()} VOLEABOX. TODOS LOS DERECHOS RESERVADOS.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
