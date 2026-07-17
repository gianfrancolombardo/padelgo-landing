import React from 'react';
import HeroCta from '../HeroCta';
import { useLanguage } from '../../i18n/LanguageContext';

const CtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-volea-green/10 to-[#050505] z-0" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-display font-bold leading-none mb-8">
            {t('cta.title')} <br />
            <span className="text-volea-green">{t('cta.titleGreen')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            {t('cta.desc')}
          </p>

          <HeroCta variant="cta" />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
