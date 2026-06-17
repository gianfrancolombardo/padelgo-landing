import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-white/5 bg-[#050505]">
      <div className="max-w-[1440px] mx-auto px-6 text-center text-gray-500 font-light text-sm flex flex-col items-center gap-4">
        <img src="/icon.png" alt="VoleaBox Icon" className="h-8 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
        <p>&copy; {new Date().getFullYear()} VOLEABOX. {t('footer.rights')}</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
