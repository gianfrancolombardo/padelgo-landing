import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LockerHeroSection from './sections/LockerHeroSection';
import LockerMarketSection from './sections/LockerMarketSection';
import LockerTechSection from './sections/LockerTechSection';
import LockerSoftwareSection from './sections/LockerSoftwareSection';
import LockerVolumeSection from './sections/LockerVolumeSection';
import LockerCtaSection from './sections/LockerCtaSection';

const LockerLanding: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-volea-green selection:text-black">
      <Header />
      <main>
        <LockerHeroSection />
        <LockerMarketSection />
        <LockerTechSection />
        <LockerSoftwareSection />
        <LockerVolumeSection />
        <LockerCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default LockerLanding;
