import React from 'react';
import { Clock, Users, XCircle, Zap } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const ClubProblemSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="problema" className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EF4444]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-volea-green/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in relative z-10">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wide">{t('clubs.problem.title')}</h2>
          <p className="text-[#D1D5DB] max-w-2xl mx-auto text-lg font-light">
            {t('clubs.problem.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          <div className="glass-card p-8 rounded-3xl border-t border-[#EF4444]/20 hover:border-[#EF4444]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-[#EF4444]" />
              </div>
              <h3 className="text-2xl font-display text-white mb-3">{t('clubs.problem.card1Title')}</h3>
              <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
                {t('clubs.problem.card1Desc')}
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 mt-auto">
              <XCircle className="w-6 h-6 text-[#EF4444] shrink-0 mt-1" />
              <p className="text-sm text-gray-400">
                <strong className="text-gray-200">{t('clubs.problem.card1Label')}</strong>{t('clubs.problem.card1Val')}
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border-t border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-display text-white mb-3">{t('clubs.problem.card2Title')}</h3>
              <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
                {t('clubs.problem.card2Desc')}
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 mt-auto">
              <XCircle className="w-6 h-6 text-gray-500 shrink-0 mt-1" />
              <p className="text-sm text-gray-400">
                <strong className="text-gray-200">{t('clubs.problem.card2Label')}</strong>{t('clubs.problem.card2Val')}
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border-t border-volea-green/20 hover:border-volea-green/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-volea-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-volea-green" />
              </div>
              <h3 className="text-2xl font-display text-white mb-3">{t('clubs.problem.card3Title')}</h3>
              <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
                {t('clubs.problem.card3Desc')}
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-volea-green/5 border border-volea-green/10 mt-auto">
              <Zap className="w-6 h-6 text-volea-green shrink-0 mt-1 animate-pulse-slow" />
              <p className="text-sm text-gray-400">
                <strong className="text-volea-green">{t('clubs.problem.card3Label')}</strong>{t('clubs.problem.card3Val')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubProblemSection;
