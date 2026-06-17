import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const ClubHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-court.png"
          alt="Premium Padel Court"
          className="w-full h-full object-cover opacity-60 animate-ken-burns grayscale"
          onError={(e) => {
             (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/50 to-[#050505]/20"></div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block border border-volea-green/30 bg-volea-green/5 text-volea-green px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-8 animate-fade-in shadow-[0_0_10px_rgba(59,255,118,0.1)]">
            {t('clubs.hero.alliance')}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6 animate-slide-up text-transparent bg-clip-text bg-gradient-to-b from-white to-[#D1D5DB] drop-shadow-2xl">
            {t('clubs.hero.titlePre')}<br className="hidden md:block" />
            <span className="text-volea-green relative">
              {t('clubs.hero.titleSpan')}
              <span className="absolute -inset-1 bg-volea-green/20 blur-2xl -z-10 rounded-full"></span>
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-volea-green max-w-3xl mx-auto mb-4 font-bold tracking-wide animate-fade-in uppercase font-display" style={{ animationDelay: '0.2s' }}>
            {t('clubs.hero.subtitle')}
          </p>

          <p className="text-lg md:text-xl text-[#D1D5DB] max-w-3xl mx-auto mb-12 font-light tracking-wide animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {t('clubs.hero.desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
             <a 
               href="#operativa" 
               className="bg-volea-green text-[#1A1D1A] px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,255,118,0.3)] w-full sm:w-auto text-center"
             >
               {t('clubs.hero.btnHow')}
             </a>
             <a 
               href="#contacto" 
               className="glass px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-white/10 transition-all duration-300 border border-white/10 w-full sm:w-auto text-center text-white"
             >
               {t('clubs.hero.btnRequest')}
             </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-slow z-20">
        <ArrowDown className="w-6 h-6 text-volea-green opacity-70" />
      </div>
    </section>
  );
};

export default ClubHeroSection;
