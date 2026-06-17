import React from 'react';
import { BadgeCheck, Globe, ShoppingCart, Database } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const PascalBusinessSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="acuerdo" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-6">{t('pascal.business.title')}<span className="text-volea-green">{t('pascal.business.titleSpan')}</span></h2>
          <p className="text-lg text-[#D1D5DB] font-light max-w-2xl mx-auto">
             {t('pascal.business.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <BadgeCheck className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">{t('pascal.business.card1Title')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   {t('pascal.business.card1DescPre')}<strong className="text-white font-normal">{t('pascal.business.card1DescBold')}</strong>{t('pascal.business.card1DescPost')}
                </p>
             </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <Globe className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">{t('pascal.business.card2Title')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   {t('pascal.business.card2Desc')}
                </p>
             </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <ShoppingCart className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">{t('pascal.business.card3Title')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   {t('pascal.business.card3Desc')}
                </p>
             </div>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <Database className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">{t('pascal.business.card4Title')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   {t('pascal.business.card4Desc')}
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PascalBusinessSection;
