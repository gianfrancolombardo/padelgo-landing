const AUTH_ERROR_MAP: Record<string, string> = {
  invalid_credentials: 'auth.errors.invalidCredentials',
  invalid_login_credentials: 'auth.errors.invalidCredentials',
  user_already_exists: 'auth.errors.emailTaken',
  email_exists: 'auth.errors.emailTaken',
  weak_password: 'auth.errors.weakPassword',
  same_password: 'auth.errors.samePassword',
  over_request_rate_limit: 'auth.errors.rateLimit',
  signup_disabled: 'auth.errors.signupDisabled',
};

export function resolveAuthErrorKey(message: string): string {
  const normalized = message.toLowerCase();

  for (const [fragment, key] of Object.entries(AUTH_ERROR_MAP)) {
    if (normalized.includes(fragment.replace(/_/g, ' ')) || normalized.includes(fragment)) {
      return key;
    }
  }

  if (normalized.includes('invalid') && normalized.includes('credential')) {
    return 'auth.errors.invalidCredentials';
  }

  if (normalized.includes('already registered') || normalized.includes('already exists')) {
    return 'auth.errors.emailTaken';
  }

  if (normalized.includes('password') && normalized.includes('6')) {
    return 'auth.errors.weakPassword';
  }

  return 'auth.errors.generic';
}
