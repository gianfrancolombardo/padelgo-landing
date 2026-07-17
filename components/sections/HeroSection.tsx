import React from 'react';
import HeroCta from '../HeroCta';
import { useLanguage } from '../../i18n/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-court.png"
          alt="Futuristic Padel Court"
          className="w-full h-full object-cover opacity-80 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-none mb-8 animate-slide-up text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
            {t('hero.title')} <br />
            <span className="text-volea-green">{t('hero.titleSpan')}</span>
            {t('hero.titleEnd')}
          </h1>

          <p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light tracking-wide animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {t('hero.subtitle')}
            <br className="hidden md:block" />
            {t('hero.subtitleBr')}
          </p>

          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <HeroCta variant="hero" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
        <div className="w-[1px] h-16 bg-gradient-to-b from-volea-green to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
