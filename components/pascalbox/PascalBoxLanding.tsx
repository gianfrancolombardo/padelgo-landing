import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PascalHeroSection from './sections/PascalHeroSection';
import PascalValueSection from './sections/PascalValueSection';
import PascalIntegrationSection from './sections/PascalIntegrationSection';
import PascalBusinessSection from './sections/PascalBusinessSection';
import PascalCtaSection from './sections/PascalCtaSection';

const PascalBoxLanding: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "VoleaBox x Pascal Box | Alianza en Mantenimiento de Pelotas";
  }, []);

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
