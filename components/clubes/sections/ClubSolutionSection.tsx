import React from 'react';
import { Smartphone, Zap, Leaf } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const ClubSolutionSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="solucion" className="py-24 bg-[#020202] relative border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden group shadow-2xl shadow-volea-green/5 animate-fade-in border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/20 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/40 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img 
              src="/assets/locker-indoor.png" 
              alt="VoleaBox Indoor Hub" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out aspect-[4/5] object-center"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="inline-block border border-volea-green/30 bg-black/60 backdrop-blur-md text-volea-green px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] shadow-lg">
                {t('clubs.solution.hub')}
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-10">
              <div className="inline-block border border-volea-green/30 bg-volea-green/5 text-volea-green px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-4">
                {t('clubs.solution.badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mb-6">
                {t('clubs.solution.title')}<span className="text-volea-green">{t('clubs.solution.titleSpan')}</span>
              </h2>
              <p className="text-[#D1D5DB] text-lg font-light">
                {t('clubs.solution.desc')}
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all duration-300 group flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-volea-green/10 flex items-center justify-center shrink-0 border border-volea-green/20 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-volea-green" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-2">{t('clubs.solution.card1Title')}</h3>
                <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {t('clubs.solution.card1Desc')}
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all duration-300 group flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-2">{t('clubs.solution.card2Title')}</h3>
                <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {t('clubs.solution.card2Desc')}
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all duration-300 group flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-2">{t('clubs.solution.card3Title')}</h3>
                <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {t('clubs.solution.card3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSolutionSection;
