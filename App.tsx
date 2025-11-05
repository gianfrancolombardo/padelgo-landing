import React from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import BenefitsSection from './components/sections/BenefitsSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#1A1D1A] text-[#FAFAFA] min-h-screen overflow-x-hidden">
      <Header />
      <main>
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
