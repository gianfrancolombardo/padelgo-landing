import React from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import BenefitsSection from './components/sections/BenefitsSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/Footer';
import ColorPreview from './components/ColorPreview';

const App: React.FC = () => {
  const [showPreview, setShowPreview] = React.useState(window.location.hash === '#preview');

  React.useEffect(() => {
    const handleHashChange = () => {
      setShowPreview(window.location.hash === '#preview');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showPreview) {
    return <ColorPreview />;
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
