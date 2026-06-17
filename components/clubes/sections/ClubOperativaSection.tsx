import React from 'react';
import { PlayCircle, ShieldCheck, Wifi } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const ClubOperativaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="operativa" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="animate-fade-in relative z-10">
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
              {t('clubs.operativa.title')}<span className="text-volea-green">{t('clubs.operativa.titleSpan')}</span>{t('clubs.operativa.titleEnd')}
            </h2>
            <p className="text-lg text-[#D1D5DB] font-light mb-12 max-w-md leading-relaxed">
              {t('clubs.operativa.desc')}
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-volea-green/10 flex items-center justify-center shrink-0 border border-volea-green/20">
                  <PlayCircle className="w-5 h-5 text-volea-green" />
                </div>
                <div>
                  <h4 className="text-xl font-display text-white mb-2">{t('clubs.operativa.card1Title')}</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {t('clubs.operativa.card1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Wifi className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-display text-white mb-2">{t('clubs.operativa.card2Title')}</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {t('clubs.operativa.card2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-display text-white mb-2">{t('clubs.operativa.card3Title')}</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {t('clubs.operativa.card3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[500px] flex items-center justify-center animate-slide-up pb-8 lg:pb-0">
             <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
               <img 
                 src="/assets/locker-outdoor.png" 
                 alt="VoleaBox Outdoor" 
                 className="w-full h-full object-cover scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/70 to-[#050505]/40 backdrop-blur-[2px]"></div>
             </div>

             <div className="glass-card p-10 rounded-[2rem] border border-white/10 relative z-10 mx-6 shadow-2xl bg-[#0A0A0A]/60 backdrop-blur-xl w-full max-w-md">
                <h3 className="text-xs font-bold tracking-[0.2em] text-volea-green mb-8 text-center uppercase">{t('clubs.operativa.process')}</h3>
               
                <div className="space-y-6 relative before:absolute before:inset-y-4 before:left-[1.35rem] before:w-[2px] before:bg-white/10">
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-[#1A1D1A] border-2 border-volea-green flex items-center justify-center font-display text-xl text-volea-green shadow-[0_0_10px_rgba(59,255,118,0.3)] shrink-0">1</div>
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">{t('clubs.operativa.step1Title')}</h4>
                      <p className="text-xs text-gray-300 mt-1">{t('clubs.operativa.step1Desc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-[#1A1D1A] border-2 border-white/20 flex items-center justify-center font-display text-xl text-white shrink-0">2</div>
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">{t('clubs.operativa.step2Title')}</h4>
                      <p className="text-xs text-gray-300 mt-1">{t('clubs.operativa.step2Desc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-[#1A1D1A] border-2 border-white/20 flex items-center justify-center font-display text-xl text-white shrink-0">3</div>
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">{t('clubs.operativa.step3Title')}</h4>
                      <p className="text-xs text-gray-300 mt-1">{t('clubs.operativa.step3Desc')}</p>
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

export default ClubOperativaSection;
