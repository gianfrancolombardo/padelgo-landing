import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MIN_CANCELLATION_HOURS } from '../../lib/bookingConfig';

const FaqSection: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { q: t('faq.duration.q'), a: t('faq.duration.a') },
    { q: t('faq.includes.q'), a: t('faq.includes.a') },
    { q: t('faq.cancel.q'), a: t('faq.cancel.a').replace('{hours}', String(MIN_CANCELLATION_HOURS)) },
  ];

  return (
    <section id="faq" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
        {t('faq.title')}
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto font-light">{t('faq.subtitle')}</p>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:border-volea-green/30 transition-colors"
          >
            <summary className="cursor-pointer font-medium text-white list-none flex justify-between items-center gap-4">
              {item.q}
              <span className="text-volea-green text-lg group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed font-light">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
