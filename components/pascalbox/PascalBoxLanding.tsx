import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PascalHeroSection from './sections/PascalHeroSection';
import PascalValueSection from './sections/PascalValueSection';
import PascalIntegrationSection from './sections/PascalIntegrationSection';
import PascalBusinessSection from './sections/PascalBusinessSection';
import PascalCtaSection from './sections/PascalCtaSection';
import { useLanguage } from '../../i18n/LanguageContext';

const PascalBoxLanding: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t('pascal.title');
  }, [t]);

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] overflow-x-hidden">
      <Header />
      <main className="w-full">
        <PascalHeroSection />
        <PascalValueSection />
        <PascalIntegrationSection />
        <PascalBusinessSection />
        <PascalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default PascalBoxLanding;
