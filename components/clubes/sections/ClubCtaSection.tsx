import React from 'react';
import { Mail, Phone, ArrowRight, Building } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

const ClubCtaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] mb-6 text-gray-300">
              <Building className="w-3.5 h-3.5" />
              <span>{t('clubs.cta.expansion')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight">
              {t('clubs.cta.title')}<span className="text-volea-green">{t('clubs.cta.titleSpan')}</span>{t('clubs.cta.titleEnd')}
            </h2>
            <p className="text-lg md:text-xl text-[#D1D5DB] font-light max-w-lg mb-10 leading-relaxed">
               {t('clubs.cta.desc')}
            </p>

            <a 
              href="mailto:carlos@voleabox.com?subject=Feasibility%20Study%20Request%20-%20Club" 
              className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-volea-green transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_30px_rgba(59,255,118,0.3)]"
            >
               {t('clubs.cta.btn')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="glass-card rounded-3xl border border-white/10 p-10 bg-[#0A0A0A]">
               <h3 className="text-xl font-display text-white mb-8 border-b border-white/10 pb-4">{t('clubs.cta.titleContact')}</h3>
               
               <div className="space-y-8">
                 <div className="flex items-start gap-4 group">
                   <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-volea-green/50 group-hover:bg-volea-green/10 transition-colors shrink-0">
                     <Mail className="w-5 h-5 text-gray-400 group-hover:text-volea-green transition-colors" />
                   </div>
                   <div>
                     <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</span>
                     <a href="mailto:carlos@voleabox.com" className="text-white hover:text-volea-green transition-colors font-medium text-lg">carlos@voleabox.com</a>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4 group">
                   <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-volea-green/50 group-hover:bg-volea-green/10 transition-colors shrink-0">
                     <Phone className="w-5 h-5 text-gray-400 group-hover:text-volea-green transition-colors" />
                   </div>
                   <div>
                     <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Carlos Neidl</span>
                     <a href="tel:+34655720515" className="text-white hover:text-volea-green transition-colors font-medium text-lg">+34 655 720 515</a>
                     <span className="block text-sm text-gray-500 mt-1 font-light">{t('clubs.cta.barcelona')}</span>
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

export default ClubCtaSection;
