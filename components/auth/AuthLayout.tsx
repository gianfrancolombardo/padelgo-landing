import React from 'react';
import LandingShell from '../layout/LandingShell';
import { useLanguage } from '../../i18n/LanguageContext';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  const { t } = useLanguage();

  return (
    <LandingShell variant="auth">
      <div className="w-full max-w-lg mx-auto auth-page-enter">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[10px] font-black tracking-[0.3em] text-volea-green uppercase mb-3">
            VoleaBox
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-400 font-light tracking-wide max-w-sm mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-[0_0_40px_rgba(59,255,118,0.08)]">
          {children}
        </div>

        <p className="text-center mt-8">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-volea-green transition-colors tracking-wide"
          >
            {t('auth.backHome')}
          </a>
        </p>
      </div>
    </LandingShell>
  );
};

export default AuthLayout;
