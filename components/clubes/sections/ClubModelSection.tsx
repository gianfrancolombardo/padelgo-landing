import React from 'react';
import { Scale, Settings } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const ClubModelSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#020202] relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display text-white tracking-wide mb-6">
            {t('clubs.model.title')}<span className="text-volea-green">{t('clubs.model.titleSpan')}</span>
          </h2>
          <p className="text-lg text-[#D1D5DB] font-light">
            {t('clubs.model.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
            <div className="w-full h-1 bg-white/10 absolute top-0 left-0 transition-colors group-hover:bg-white/30"></div>
            <Scale className="w-8 h-8 text-volea-green mb-6" />
            <h3 className="text-2xl font-display text-white mb-3">{t('clubs.model.card1Title')}</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              {t('clubs.model.card1Desc')}
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden bg-volea-green/5 border-volea-green/20 group">
            <div className="absolute inset-0 bg-gradient-to-b from-volea-green/5 to-transparent pointer-events-none"></div>
            <div className="w-full h-1 bg-volea-green absolute top-0 left-0 shadow-[0_0_10px_rgba(59,255,118,0.8)]"></div>
            <Settings className="w-8 h-8 text-volea-green mb-6" />
            <h3 className="text-2xl font-display text-white mb-3">{t('clubs.model.card2Title')}</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              {t('clubs.model.card2Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubModelSection;
