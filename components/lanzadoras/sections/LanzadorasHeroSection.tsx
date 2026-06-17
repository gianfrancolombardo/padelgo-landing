import React from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';

const LanzadorasHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/slinger_locker_hero.png"
          alt="Locker Automático para Lanzadora de Pelotas"
          className="w-full h-full object-cover opacity-60 animate-ken-burns grayscale"
          onError={(e) => {
             (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/50 to-transparent"></div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-volea-green/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-volea-green/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block border border-volea-green/30 bg-volea-green/5 text-volea-green px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.3em] mb-10 animate-fade-in shadow-[0_0_15px_rgba(59,255,118,0.1)] uppercase">
            {t('lanzadoras.hero.alliance')}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 animate-slide-up text-transparent bg-clip-text bg-gradient-to-b from-white to-[#D1D5DB] drop-shadow-2xl">
            {t('lanzadoras.hero.titlePre')} <br className="hidden md:block" />
            <span className="text-volea-green relative inline-block">
              {t('lanzadoras.hero.titleSpan')}
              <span className="absolute -inset-4 bg-volea-green/10 blur-3xl -z-10 rounded-full"></span>
            </span> <br className="hidden md:block" />
            {t('lanzadoras.hero.titleEnd')}
          </h1>

          <p className="text-lg md:text-2xl text-[#D1D5DB] max-w-3xl mx-auto mb-14 font-light tracking-wide animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t('lanzadoras.hero.subtitle')}<strong className="text-white font-normal">{t('lanzadoras.hero.subtitleBrand')}</strong>{t('lanzadoras.hero.subtitleEnd')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
             <a 
               href="#showroom" 
               className="bg-volea-green text-[#1A1D1A] px-10 py-5 rounded-full text-xs font-black tracking-[0.2em] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(59,255,118,0.3)] w-full sm:w-auto text-center uppercase"
             >
               {t('lanzadoras.hero.btnValue')}
             </a>
             <a 
               href="#contacto" 
               className="glass px-10 py-5 rounded-full text-xs font-bold tracking-[0.2em] hover:bg-white/10 transition-all duration-300 border border-white/10 w-full sm:w-auto text-center text-white uppercase"
             >
               {t('lanzadoras.hero.btnContact')}
             </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-40 z-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-volea-green to-transparent animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default LanzadorasHeroSection;
