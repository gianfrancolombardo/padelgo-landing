import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const BenefitItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-500 group">
        <div className="text-volea-green group-hover:scale-110 transition-transform duration-300 origin-left">
            <CheckCircle2 size={32} strokeWidth={1.5} />
        </div>
        <div>
            <h3 className="text-2xl font-display uppercase tracking-wider text-white mb-2 group-hover:text-volea-green transition-colors">{title}</h3>
            <p className="text-gray-300 font-light leading-relaxed">{children}</p>
        </div>
    </div>
);

const BenefitsSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="beneficios" className="py-24 bg-[#080808] border-t border-white/5 scroll-mt-20">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center mx-auto">
                    <div>
                        <h2 className="text-4xl sm:text-6xl font-display font-bold leading-none mb-6">
                            {t('benefits.title')}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-volea-green to-emerald-600">{t('benefits.titleGreen')}</span>.
                        </h2>
                        <p className="text-xl text-gray-300 font-light max-w-md">
                            {t('benefits.desc')}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <BenefitItem title={t('benefits.items.improvement.title')}>
                            {t('benefits.items.improvement.desc')}
                        </BenefitItem>
                        <BenefitItem title={t('benefits.items.friction.title')}>
                            {t('benefits.items.friction.desc')}
                        </BenefitItem>
                        <BenefitItem title={t('benefits.items.pace.title')}>
                            {t('benefits.items.pace.desc')}
                        </BenefitItem>
                        <BenefitItem title={t('benefits.items.premium.title')}>
                            {t('benefits.items.premium.desc')}
                        </BenefitItem>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;