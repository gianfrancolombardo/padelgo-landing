import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { authGhostButtonClass, authInputClass, authLinkClass, authPrimaryButtonClass } from './authStyles';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveAuthErrorKey } from '../../lib/authErrors';
import { navigateTo, getPostAuthRedirectPath, preserveNextParam } from '../../lib/navigation';
import { ROUTES } from '../../i18n/routes';

const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, resetPassword, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'reset-sent'>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigateTo(getPostAuthRedirectPath(ROUTES.account));
    }
  }, [authLoading, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorKey(null);

    const { error } = await signIn(email, password);
    if (error) {
      setErrorKey(resolveAuthErrorKey(error.message));
      setStatus('idle');
      return;
    }

    navigateTo(getPostAuthRedirectPath(ROUTES.account));
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorKey(null);

    const { error } = await resetPassword(email);
    if (error) {
      setErrorKey(resolveAuthErrorKey(error.message));
      setStatus('idle');
      return;
    }

    setStatus('reset-sent');
  };

  if (authLoading && user) {
    return null;
  }

  return (
    <AuthLayout title={t('auth.login.title')} subtitle={t('auth.login.subtitle')}>
      {status === 'reset-sent' ? (
        <p className="text-center text-volea-green font-light leading-relaxed">{t('auth.reset.sent')}</p>
      ) : showReset ? (
        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email')}
            required
            disabled={status === 'submitting'}
            className={authInputClass}
          />
          {errorKey && <p className="text-red-400 text-sm text-center">{t(errorKey)}</p>}
          <button type="submit" disabled={status === 'submitting'} className={authPrimaryButtonClass}>
            {status === 'submitting' && <Loader2 className="animate-spin" size={18} />}
            {t('auth.reset.submit')}
          </button>
          <button type="button" onClick={() => setShowReset(false)} className={authGhostButtonClass}>
            {t('auth.reset.backToLogin')}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email')}
            required
            disabled={status === 'submitting'}
            className={authInputClass}
            autoComplete="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password')}
            required
            minLength={6}
            disabled={status === 'submitting'}
            className={authInputClass}
            autoComplete="current-password"
          />
          {errorKey && <p className="text-red-400 text-sm text-center">{t(errorKey)}</p>}
          <button type="submit" disabled={status === 'submitting'} className={authPrimaryButtonClass}>
            {status === 'submitting' && <Loader2 className="animate-spin" size={18} />}
            {t('auth.login.submit')}
          </button>
          <button type="button" onClick={() => setShowReset(true)} className={authGhostButtonClass}>
            {t('auth.reset.link')}
          </button>
          <p className="text-center text-sm text-gray-500 pt-1">
            {t('auth.login.noAccount')}{' '}
            <a href={preserveNextParam(ROUTES.register)} className={authLinkClass}>
              {t('auth.register.link')}
            </a>
          </p>
        </form>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
