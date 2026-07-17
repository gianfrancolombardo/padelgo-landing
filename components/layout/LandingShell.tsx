import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface LandingShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'auth';
}

const LandingShell: React.FC<LandingShellProps> = ({ children, variant = 'default' }) => {
  const isAuth = variant === 'auth';

  return (
    <div className="min-h-screen bg-[#020202] text-[#FAFAFA] overflow-x-hidden flex flex-col">
      {isAuth && (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]" aria-hidden>
          <img
            src="/assets/hero-court.png"
            alt=""
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/90 to-[#020202]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#020202]" />
        </div>
      )}

      <Header />

      <main
        className={`relative z-10 flex-1 w-full ${
          isAuth ? 'flex items-center py-16 md:py-24 pt-28 md:pt-32' : ''
        }`}
      >
        {isAuth ? (
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">{children}</div>
        ) : (
          children
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LandingShell;
