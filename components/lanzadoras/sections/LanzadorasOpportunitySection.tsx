import React from 'react';
import { Target, RotateCcw, TrendingDown } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const LanzadorasOpportunitySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden" id="oportunidad">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-volea-green/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <div className="text-volea-green/60 text-sm font-bold tracking-[0.3em] mb-4 uppercase">{t('lanzadoras.opportunity.badge')}</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white max-w-3xl mb-8 leading-tight">
            {t('lanzadoras.opportunity.title')}<span className="text-volea-green">{t('lanzadoras.opportunity.titleSpan')}</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            {t('lanzadoras.opportunity.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass p-10 rounded-[2rem] border border-white/5 hover:border-volea-green/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-volea-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-volea-green group-hover:bg-volea-green/5 group-hover:border-volea-green/20 transition-all duration-300">
              <RotateCcw className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('lanzadoras.opportunity.card1Title')}</h3>
            <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
              {t('lanzadoras.opportunity.card1Desc')}
            </p>
            <div className="text-white/40 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
              <span className="w-6 h-[1px] bg-white/10"></span> {t('lanzadoras.opportunity.card1Footer')}
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass p-10 rounded-[2rem] border border-white/5 hover:border-volea-green/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-volea-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-volea-green group-hover:bg-volea-green/5 group-hover:border-volea-green/20 transition-all duration-300">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('lanzadoras.opportunity.card2Title')}</h3>
            <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
              {t('lanzadoras.opportunity.card2Desc')}
            </p>
            <div className="text-white/40 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
              <span className="w-6 h-[1px] bg-white/10"></span> {t('lanzadoras.opportunity.card2Footer')}
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass p-10 rounded-[2rem] border border-white/5 hover:border-volea-green/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-volea-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:text-volea-green group-hover:bg-volea-green/5 group-hover:border-volea-green/20 transition-all duration-300">
              <TrendingDown className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('lanzadoras.opportunity.card3Title')}</h3>
            <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
              {t('lanzadoras.opportunity.card3Desc')}
            </p>
            <div className="text-white/40 text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
              <span className="w-6 h-[1px] bg-white/10"></span> {t('lanzadoras.opportunity.card3Footer')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanzadorasOpportunitySection;
