import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SlingerHeroSection from './sections/SlingerHeroSection';
import SlingerOpportunitySection from './sections/SlingerOpportunitySection';
import SlingerPartnershipSection from './sections/SlingerPartnershipSection';
import SlingerExperienceSection from './sections/SlingerExperienceSection';
import SlingerB2bSection from './sections/SlingerB2bSection';
import SlingerRoadmapSection from './sections/SlingerRoadmapSection';
import SlingerCtaSection from './sections/SlingerCtaSection';

const SlingerLanding: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "VoleaBox x Slinger | Entrenamiento de Élite Automatizado";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-volea-green/30 selection:text-white overflow-x-hidden">
      <Header />
      <main className="w-full">
        <SlingerHeroSection />
        <SlingerOpportunitySection />
        <SlingerPartnershipSection />
        <SlingerExperienceSection />
        <SlingerB2bSection />
        <SlingerRoadmapSection />
        <SlingerCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default SlingerLanding;
