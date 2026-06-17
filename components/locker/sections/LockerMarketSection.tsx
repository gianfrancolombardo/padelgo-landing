import React from 'react';
import { TrendingUp, Users, MapPin } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const LockerMarketSection: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <MapPin className="w-6 h-6" />,
      value: t('locker.market.stat1Val'),
      label: t('locker.market.stat1Label'),
      desc: t('locker.market.stat1Desc')
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: t('locker.market.stat2Val'),
      label: t('locker.market.stat2Label'),
      desc: t('locker.market.stat2Desc')
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: t('locker.market.stat3Val'),
      label: t('locker.market.stat3Label'),
      desc: t('locker.market.stat3Desc')
    }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden" id="mercado">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">{t('locker.market.badge')}</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              {t('locker.market.title')}<span className="text-volea-green">{t('locker.market.titleSpan')}</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg font-light leading-relaxed mb-10">
              {t('locker.market.desc')}
            </p>
            <div className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-volea-green/5 to-transparent">
              <p className="text-white italic font-light text-lg">
                {t('locker.market.quote')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-volea-green/20 transition-all duration-500 group flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-volea-green group-hover:bg-volea-green group-hover:text-black transition-all duration-300 shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-volea-green text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-light mt-1">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LockerMarketSection;
