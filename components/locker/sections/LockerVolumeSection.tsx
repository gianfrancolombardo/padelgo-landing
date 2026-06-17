import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const LockerVolumeSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="volumen">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <div>
              <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">{t('locker.volume.badge')}</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                {t('locker.volume.title')}<span className="text-volea-green">{t('locker.volume.titleSpan')}</span>
              </h2>
              <p className="text-[#A1A1AA] text-lg font-light leading-relaxed">
                {t('locker.volume.desc')}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-8 items-center p-8 rounded-3xl glass border border-white/5">
                <div className="text-4xl font-display font-bold text-white">500+</div>
                <div className="h-10 w-[1px] bg-white/10"></div>
                <div className="text-sm font-light text-gray-400 uppercase tracking-widest">{t('locker.volume.stat1Label')}</div>
              </div>

              <div className="flex gap-8 items-center p-8 rounded-3xl glass border border-white/5">
                <div className="text-4xl font-display font-bold text-volea-green">100</div>
                <div className="h-10 w-[1px] bg-white/10"></div>
                <div className="text-sm font-light text-gray-400 uppercase tracking-widest">{t('locker.volume.stat2Label')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass p-12 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden">
               <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-volea-green/10 rounded-full blur-[80px]"></div>
               <h4 className="text-white text-2xl font-bold mb-10 flex items-center gap-4">
                 <Globe className="w-6 h-6 text-volea-green" />
                 {t('locker.volume.roadmapTitle')}
               </h4>
               <div className="space-y-10 relative">
                  <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-white/10"></div>
                  
                  <div className="flex gap-10 items-start relative">
                    <div className="w-8 h-8 rounded-full bg-volea-green flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(59,255,118,0.4)]">
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-volea-green font-bold uppercase mb-1">{t('locker.volume.phase1Title')}</span>
                      <p className="text-sm text-white font-medium">{t('locker.volume.phase1Desc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-10 items-start relative text-white/40">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold mb-1 tracking-widest">{t('locker.volume.phase2Title')}</span>
                      <p className="text-sm font-medium">{t('locker.volume.phase2Desc')}</p>
                    </div>
                  </div>

                  <div className="flex gap-10 items-start relative text-white/40">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold mb-1 tracking-widest">{t('locker.volume.phase3Title')}</span>
                      <p className="text-sm font-medium">{t('locker.volume.phase3Desc')}</p>
                    </div>
                  </div>

               </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LockerVolumeSection;
