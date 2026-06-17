import React from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import BenefitsSection from './components/sections/BenefitsSection';
import SustainabilitySection from './components/sections/SustainabilitySection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/Footer';
import ColorPreview from './components/ColorPreview';
import ClubesLanding from './components/clubes/ClubesLanding';
import PascalBoxLanding from './components/pascalbox/PascalBoxLanding';
import SlingerLanding from './components/slinger/SlingerLanding';
import LockerLanding from './components/locker/LockerLanding';
import LanzadorasLanding from './components/lanzadoras/LanzadorasLanding';
import { LanguageProvider } from './i18n/LanguageContext';
import { redirectLegacyPath, resolveRoute, type AppRoute } from './i18n/routes';

const AppContent: React.FC = () => {
  const [route, setRoute] = React.useState<AppRoute>(() =>
    resolveRoute(window.location.pathname, window.location.hash)
  );

  React.useEffect(() => {
    const legacyTarget = redirectLegacyPath(window.location.pathname);
    if (legacyTarget) {
      window.history.replaceState(null, '', legacyTarget);
      setRoute(resolveRoute(legacyTarget, window.location.hash));
      return;
    }

    const syncRoute = () => {
      setRoute(resolveRoute(window.location.pathname, window.location.hash));
    };

    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  if (route === 'preview') {
    return <ColorPreview />;
  }

  if (route === 'clubs') {
    return <ClubesLanding />;
  }

  if (route === 'pascalbox') {
    return <PascalBoxLanding />;
  }

  if (route === 'slinger') {
    return <SlingerLanding />;
  }

  if (route === 'lockers') {
    return <LockerLanding />;
  }

  if (route === 'ballLaunchers') {
    return <LanzadorasLanding />;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] overflow-x-hidden">
      <Header />
      <main className="w-full">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <SustainabilitySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
