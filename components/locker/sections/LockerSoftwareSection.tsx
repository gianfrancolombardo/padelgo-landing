import React from 'react';
import { Smartphone, Database, Lock, Wifi } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const LockerSoftwareSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden" id="software">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">{t('locker.software.badge')}</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            {t('locker.software.title')} <br />
            <span className="text-volea-green">{t('locker.software.titleSpan')}</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {t('locker.software.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">{t('locker.software.card1Title')}</h4>
            <p className="text-gray-500 text-sm font-light">{t('locker.software.card1Desc')}</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">{t('locker.software.card2Title')}</h4>
            <p className="text-gray-500 text-sm font-light">{t('locker.software.card2Desc')}</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">{t('locker.software.card3Title')}</h4>
            <p className="text-gray-500 text-sm font-light">{t('locker.software.card3Desc')}</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Wifi className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">{t('locker.software.card4Title')}</h4>
            <p className="text-gray-500 text-sm font-light">{t('locker.software.card4Desc')}</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LockerSoftwareSection;
