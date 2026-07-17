import { describe, expect, it } from 'vitest';
import { redirectLegacyPath, resolveRoute, ROUTES } from './routes';

describe('resolveRoute', () => {
  it('resolves auth routes', () => {
    expect(resolveRoute('/login', '')).toBe('login');
    expect(resolveRoute('/register', '')).toBe('register');
    expect(resolveRoute('/account', '')).toBe('account');
    expect(resolveRoute('/book', '')).toBe('book');
  });

  it('resolves marketing routes', () => {
    expect(resolveRoute('/', '')).toBe('home');
    expect(resolveRoute(ROUTES.clubs, '')).toBe('clubs');
    expect(resolveRoute(ROUTES.ballLaunchers, '')).toBe('ballLaunchers');
  });

  it('resolves preview from hash', () => {
    expect(resolveRoute('/', '#preview')).toBe('preview');
  });
});

describe('redirectLegacyPath', () => {
  it('redirects Spanish legacy paths', () => {
    expect(redirectLegacyPath('/clubes')).toBe(ROUTES.clubs);
    expect(redirectLegacyPath('/lanzadoras')).toBe(ROUTES.ballLaunchers);
  });

  it('returns null for unknown paths', () => {
    expect(redirectLegacyPath('/unknown')).toBeNull();
  });
});
