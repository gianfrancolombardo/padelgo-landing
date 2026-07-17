import { describe, expect, it } from 'vitest';
import { resolveAuthErrorKey } from './authErrors';

describe('resolveAuthErrorKey', () => {
  it('maps invalid login credentials', () => {
    expect(resolveAuthErrorKey('Invalid login credentials')).toBe('auth.errors.invalidCredentials');
  });

  it('maps duplicate email errors', () => {
    expect(resolveAuthErrorKey('User already registered')).toBe('auth.errors.emailTaken');
  });

  it('maps weak password errors', () => {
    expect(resolveAuthErrorKey('Password should be at least 6 characters')).toBe('auth.errors.weakPassword');
  });

  it('maps rate limit errors', () => {
    expect(resolveAuthErrorKey('over_request_rate_limit')).toBe('auth.errors.rateLimit');
  });

  it('returns generic for unknown messages', () => {
    expect(resolveAuthErrorKey('Something unexpected happened')).toBe('auth.errors.generic');
  });
});
