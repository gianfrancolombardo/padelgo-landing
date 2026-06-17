import React from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';

const PascalHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 scale-105 animate-ken-burns">
        <img 
          src="/assets/pascal-hero-bg.png" 
          alt="Pascal Box Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/40 to-[#020202]"></div>
      </div>

      {/* Background with extra glow */}
      <div className="absolute inset-0 z-1 opacity-40">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-volea-green/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]"></div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-volea-green/30 bg-volea-green/5 text-volea-green px-6 py-2 rounded-full text-sm font-bold tracking-[0.3em] mb-10 animate-fade-in uppercase">
             {t('pascal.hero.alliance')}
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold leading-none mb-8 animate-slide-up text-transparent bg-clip-text bg-gradient-to-b from-white to-[#D1D5DB] drop-shadow-2xl">
            {t('pascal.hero.title')} <br className="hidden md:block" />
            <span className="text-volea-green">{t('pascal.hero.titleSpan')}</span>
          </h1>

          <p className="text-xl md:text-3xl text-[#D1D5DB] max-w-3xl mx-auto mb-14 font-light tracking-wide animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('pascal.hero.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
             <div className="flex flex-col items-center gap-3">
                <span className="text-volea-green font-display text-4xl">{t('pascal.hero.stat1Val')}</span>
                <span className="text-xs tracking-widest text-gray-500 font-bold uppercase">{t('pascal.hero.stat1Label')}</span>
             </div>
             <div className="flex flex-col items-center gap-3 border-x border-white/10">
                <span className="text-white font-display text-4xl">{t('pascal.hero.stat2Val')}</span>
                <span className="text-xs tracking-widest text-gray-500 font-bold uppercase">{t('pascal.hero.stat2Label')}</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <span className="text-volea-green font-display text-4xl">{t('pascal.hero.stat3Val')}</span>
                <span className="text-xs tracking-widest text-gray-500 font-bold uppercase">{t('pascal.hero.stat3Label')}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Corporate scroll aesthetic */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-30">
        <div className="w-[2px] h-20 bg-gradient-to-b from-volea-green to-transparent"></div>
      </div>
    </section>
  );
};

export default PascalHeroSection;
