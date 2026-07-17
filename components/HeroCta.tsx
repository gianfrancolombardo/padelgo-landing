import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../i18n/routes';
import { bookingEntryPath, withNextParam } from '../lib/navigation';

interface HeroCtaProps {
  variant?: 'hero' | 'cta';
}

const HeroCta: React.FC<HeroCtaProps> = ({ variant = 'hero' }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isHero = variant === 'hero';

  const primaryLabel = isHero ? t('hero.ctaPrimary') : t('cta.btnPrimary');
  const secondaryLabel = isHero ? t('hero.ctaSecondary') : t('cta.btnSecondary');
  const microcopy = isHero ? t('hero.microcopy') : t('cta.microcopy');

  const primaryHref = bookingEntryPath(Boolean(user));
  const secondaryHref = user ? ROUTES.account : withNextParam(ROUTES.login, ROUTES.book);

  const primaryClass =
    'inline-flex items-center justify-center gap-2 bg-volea-green text-volea-dark font-bold tracking-wide text-base px-8 py-4 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,255,118,0.2)] hover:shadow-[0_0_30px_rgba(59,255,118,0.4)] whitespace-nowrap';

  const secondaryClass =
    'inline-flex items-center justify-center gap-2 bg-white/5 text-white border border-white/15 font-bold tracking-wide text-base px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/30 transition-all whitespace-nowrap backdrop-blur-sm';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
        <a href={primaryHref} className={primaryClass}>
          <span>{primaryLabel}</span>
          <ArrowRight size={20} strokeWidth={2.5} />
        </a>
        <a href={secondaryHref} className={secondaryClass}>
          {secondaryLabel}
        </a>
      </div>
      <p className="text-sm text-gray-500 font-light animate-fade-in">{microcopy}</p>
    </div>
  );
};

export default HeroCta;
