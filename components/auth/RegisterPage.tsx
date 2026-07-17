import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { authInputClass, authLinkClass, authPrimaryButtonClass } from './authStyles';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveAuthErrorKey } from '../../lib/authErrors';
import { navigateTo, getPostAuthRedirectPath, preserveNextParam } from '../../lib/navigation';
import { ROUTES } from '../../i18n/routes';

const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const { signUp, user, loading: authLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'confirm' | 'success'>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      navigateTo(getPostAuthRedirectPath(ROUTES.account));
    }
  }, [authLoading, user]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorKey(null);

    const { error, needsConfirmation } = await signUp(email, password, fullName.trim() || undefined);

    if (error) {
      setErrorKey(resolveAuthErrorKey(error.message));
      setStatus('idle');
      return;
    }

    if (needsConfirmation) {
      setStatus('confirm');
      return;
    }

    setStatus('success');
    navigateTo(getPostAuthRedirectPath(ROUTES.account));
  };

  if (authLoading && user) {
    return null;
  }

  if (status === 'confirm') {
    return (
      <AuthLayout title={t('auth.register.confirmTitle')} subtitle={t('auth.register.confirmSubtitle')}>
        <p className="text-center text-gray-300 font-light leading-relaxed">{t('auth.register.checkEmail')}</p>
        <a href={ROUTES.login} className={`mt-6 block text-center ${authPrimaryButtonClass}`}>
          {t('auth.login.link')}
        </a>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('auth.register.title')} subtitle={t('auth.register.subtitle')}>
      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={t('auth.fullName')}
          disabled={status === 'submitting'}
          className={authInputClass}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        {errorKey && <p className="text-red-400 text-sm text-center">{t(errorKey)}</p>}
        <button type="submit" disabled={status === 'submitting'} className={authPrimaryButtonClass}>
          {status === 'submitting' && <Loader2 className="animate-spin" size={18} />}
          {t('auth.register.submit')}
        </button>
        <p className="text-center text-sm text-gray-500 pt-1">
          {t('auth.register.hasAccount')}{' '}
          <a href={preserveNextParam(ROUTES.login)} className={authLinkClass}>
            {t('auth.login.link')}
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
