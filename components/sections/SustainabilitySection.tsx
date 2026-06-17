import React from 'react';
import { Leaf, Recycle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const SustainabilitySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="sostenibilidad" className="relative py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-volea-green/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-volea-green/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="glass-card max-w-5xl mx-auto rounded-[2.5rem] border border-white/5 hover:border-volea-green/20 transition-all duration-700 p-8 md:p-16 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent">
          {/* Subtle green line at top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-volea-green/30 to-transparent"></div>
          
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-volea-green/10 border border-volea-green/20 flex items-center justify-center text-volea-green shadow-xl animate-float">
                <Leaf className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-none uppercase tracking-wider text-white">
                {t('sustainability.title')} <br />
                <span className="text-volea-green">{t('sustainability.titleGreen')}</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed border-l-2 border-volea-green/40 pl-6 py-2">
                {t('sustainability.desc')}
              </p>
              <div className="flex items-center gap-3 text-xs tracking-wider text-gray-500 font-bold uppercase pl-6">
                <Recycle className="w-4 h-4 text-volea-green" />
                <span>{t('sustainability.ecosystem')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
