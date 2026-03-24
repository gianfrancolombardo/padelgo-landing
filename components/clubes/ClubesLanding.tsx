import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ClubHeroSection from './sections/ClubHeroSection';
import ClubProblemSection from './sections/ClubProblemSection';
import ClubSolutionSection from './sections/ClubSolutionSection';
import ClubOperativaSection from './sections/ClubOperativaSection';
import ClubModelSection from './sections/ClubModelSection';
import ClubCtaSection from './sections/ClubCtaSection';

const ClubesLanding: React.FC = () => {
  // Ensure we start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] overflow-x-hidden">
      <Header />
      <main className="w-full">
        <ClubHeroSection />
        <ClubProblemSection />
        <ClubSolutionSection />
        <ClubOperativaSection />
        <ClubModelSection />
        <ClubCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default ClubesLanding;
