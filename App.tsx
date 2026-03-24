import React from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import BenefitsSection from './components/sections/BenefitsSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/Footer';
import ColorPreview from './components/ColorPreview';
import ClubesLanding from './components/clubes/ClubesLanding';
import PascalBoxLanding from './components/pascalbox/PascalBoxLanding';

const App: React.FC = () => {
  const [showPreview, setShowPreview] = React.useState(window.location.hash === '#preview');
  const [isClubs, setIsClubs] = React.useState(window.location.pathname === '/clubs');
  const [isPascal, setIsPascal] = React.useState(window.location.pathname === '/pascalbox');

  React.useEffect(() => {
    const handleHashChange = () => {
      setShowPreview(window.location.hash === '#preview');
    };
    const handlePopState = () => {
      setIsClubs(window.location.pathname === '/clubs');
      setIsPascal(window.location.pathname === '/pascalbox');
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (showPreview) {
    return <ColorPreview />;
  }

  if (isClubs) {
    return <ClubesLanding />;
  }

  if (isPascal) {
    return <PascalBoxLanding />;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] overflow-x-hidden">
      <Header />
      <main className="w-full">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
