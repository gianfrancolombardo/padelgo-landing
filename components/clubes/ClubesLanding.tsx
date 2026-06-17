import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ClubHeroSection from './sections/ClubHeroSection';
import ClubProblemSection from './sections/ClubProblemSection';
import ClubSolutionSection from './sections/ClubSolutionSection';
import ClubOperativaSection from './sections/ClubOperativaSection';
import ClubModelSection from './sections/ClubModelSection';
import ClubCtaSection from './sections/ClubCtaSection';
import { useLanguage } from '../../i18n/LanguageContext';

const ClubesLanding: React.FC = () => {
  const { t } = useLanguage();

  // Ensure we start at the top and update title dynamically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t('clubs.title');
  }, [t]);

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
