import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LanzadorasHeroSection from './sections/LanzadorasHeroSection';
import LanzadorasOpportunitySection from './sections/LanzadorasOpportunitySection';
import LanzadorasPartnershipSection from './sections/LanzadorasPartnershipSection';
import LanzadorasExperienceSection from './sections/LanzadorasExperienceSection';
import LanzadorasB2bSection from './sections/LanzadorasB2bSection';
import LanzadorasRoadmapSection from './sections/LanzadorasRoadmapSection';
import LanzadorasCtaSection from './sections/LanzadorasCtaSection';
import { useLanguage } from '../../i18n/LanguageContext';

const LanzadorasLanding: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t('lanzadoras.title');
  }, [t]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-volea-green/30 selection:text-white overflow-x-hidden">
      <Header />
      <main className="w-full">
        <LanzadorasHeroSection />
        <LanzadorasOpportunitySection />
        <LanzadorasPartnershipSection />
        <LanzadorasExperienceSection />
        <LanzadorasB2bSection />
        <LanzadorasRoadmapSection />
        <LanzadorasCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LanzadorasLanding;
