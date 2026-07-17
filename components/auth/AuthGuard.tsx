import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { navigateTo } from '../../lib/navigation';
import { ROUTES } from '../../i18n/routes';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuardLoading: React.FC = () => (
  <div className="min-h-screen bg-[#020202] flex items-center justify-center" data-testid="auth-guard-loading">
    <div className="h-10 w-10 border-2 border-volea-green border-t-transparent rounded-full animate-spin" />
  </div>
);

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigateTo(ROUTES.login);
    }
  }, [loading, user]);

  if (loading) {
    return <AuthGuardLoading />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
