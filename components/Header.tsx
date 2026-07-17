import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { resolveRoute, ROUTES, type AppRoute } from '../i18n/routes';
import { bookingEntryPath } from '../lib/navigation';

const AUTH_ROUTES: AppRoute[] = ['login', 'register', 'account', 'book'];

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const route = typeof window !== 'undefined'
    ? resolveRoute(window.location.pathname, window.location.hash)
    : 'home';

  const isAuthRoute = AUTH_ROUTES.includes(route);
  const isHome = route === 'home';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = 'text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-colors uppercase';
  const ctaClass =
    'bg-volea-green text-black px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,255,118,0.2)] uppercase whitespace-nowrap';

  const headerMotion = isAuthRoute ? '' : 'animate-slide-down';
  const headerSurface = scrolled || isAuthRoute ? 'glass py-4' : 'bg-transparent py-6';
  const headerTransition = isAuthRoute ? '' : 'transition-all duration-500 ease-in-out';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${headerTransition} ${headerSurface}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center gap-4">
        <div className={`flex items-center gap-2 shrink-0 ${headerMotion}`} style={{ animationDelay: '0s' }}>
          <a
            href="/"
            className="text-2xl font-display tracking-widest text-white cursor-pointer select-none flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/icon.png" alt="VoleaBox Icon" className="h-6 w-auto object-contain pb-1" />
            <span>VOLEA<span className="text-volea-green">BOX</span></span>
          </a>
        </div>

        {!isAuthRoute && (
          <nav
            className={`hidden md:flex gap-10 items-center flex-1 justify-center ${headerMotion}`}
            style={{ animationDelay: '0.1s' }}
          >
            {route === 'pascalbox' ? (
              <>
                <a href="#vision" className={navLinkClass}>{t('header.pascal.vision')}</a>
                <a href="#integracion" className={navLinkClass}>{t('header.pascal.integracion')}</a>
                <a href="#acuerdo" className={navLinkClass}>{t('header.pascal.acuerdo')}</a>
                <a href="#contacto" className={ctaClass}>{t('header.pascal.cta')}</a>
              </>
            ) : route === 'clubs' ? (
              <>
                <a href="#problema" className={navLinkClass}>{t('header.clubs.desafio')}</a>
                <a href="#solucion" className={navLinkClass}>{t('header.clubs.solucion')}</a>
                <a href="#operativa" className={navLinkClass}>{t('header.clubs.operativa')}</a>
                <a href="#contacto" className={ctaClass}>{t('header.clubs.cta')}</a>
              </>
            ) : route === 'slinger' || route === 'ballLaunchers' ? (
              <>
                <a href="#oportunidad" className={navLinkClass}>{t('header.slinger.desafio')}</a>
                <a href="#showroom" className={navLinkClass}>{t('header.slinger.showroom')}</a>
                <a href="#experiencia" className={navLinkClass}>{t('header.slinger.operativa')}</a>
                <a href="#b2b" className={navLinkClass}>{t('header.slinger.b2b')}</a>
                <a href="#contacto" className={ctaClass}>{t('header.slinger.cta')}</a>
              </>
            ) : route === 'lockers' ? (
              <>
                <a href="#mercado" className={navLinkClass}>{t('header.locker.mercado')}</a>
                <a href="#hardware" className={navLinkClass}>{t('header.locker.hardware')}</a>
                <a href="#software" className={navLinkClass}>{t('header.locker.software')}</a>
                <a href="#volumen" className={navLinkClass}>{t('header.locker.volumen')}</a>
                <a href="#contacto" className={ctaClass}>{t('header.locker.cta')}</a>
              </>
            ) : isHome ? (
              <>
                <a href="#problema" className="text-xs font-bold tracking-[0.2em] text-gray-300 hover:text-white transition-colors uppercase">{t('header.problema')}</a>
                <a href="#solucion" className="text-xs font-bold tracking-[0.2em] text-gray-300 hover:text-white transition-colors uppercase">{t('header.solucion')}</a>
                <a href="#beneficios" className="text-xs font-bold tracking-[0.2em] text-gray-300 hover:text-white transition-colors uppercase">{t('header.beneficios')}</a>
              </>
            ) : null}
          </nav>
        )}

        <div className={`flex items-center gap-3 md:gap-4 shrink-0 ${headerMotion}`} style={{ animationDelay: '0.2s' }}>
          <LanguageSelector />
          {isHome && !authLoading && (
            <a href={bookingEntryPath(Boolean(user))} className={ctaClass}>
              {user ? t('booking.header.reserve') : t('booking.header.reserve')}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
