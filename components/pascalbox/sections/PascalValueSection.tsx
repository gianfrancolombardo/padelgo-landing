import React from 'react';
import { Target, BarChart3, Recycle } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const PascalValueSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="vision" className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-8 tracking-wide">{t('pascal.value.title')}<span className="text-volea-green">{t('pascal.value.titleSpan')}</span></h2>
          <p className="text-lg md:text-xl text-[#D1D5DB] font-light leading-relaxed">
            {t('pascal.value.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Item 1 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Target className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">{t('pascal.value.card1Title')}</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              {t('pascal.value.card1Desc')}
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <BarChart3 className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">{t('pascal.value.card2Title')}</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              {t('pascal.value.card2Desc')}
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Recycle className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">{t('pascal.value.card3Title')}</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              {t('pascal.value.card3Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PascalValueSection;
