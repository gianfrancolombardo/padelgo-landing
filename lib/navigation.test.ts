import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  bookingEntryPath,
  getPostAuthRedirectPath,
  navigateTo,
  preserveNextParam,
  withNextParam,
} from './navigation';
import { ROUTES } from '../i18n/routes';

describe('navigateTo', () => {
  it('updates history and dispatches popstate', () => {
    const pushState = vi.spyOn(window.history, 'pushState').mockImplementation(() => undefined);
    const dispatch = vi.spyOn(window, 'dispatchEvent');

    navigateTo('/login');

    expect(pushState).toHaveBeenCalledWith(null, '', '/login');
    expect(dispatch).toHaveBeenCalledWith(expect.any(PopStateEvent));

    pushState.mockRestore();
    dispatch.mockRestore();
  });
});

describe('auth redirect helpers', () => {
  const originalSearch = window.location.search;

  afterEach(() => {
    window.history.replaceState(null, '', originalSearch || '/');
  });

  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('returns next path when valid', () => {
    window.history.replaceState(null, '', '/login?next=%2Fbook');
    expect(getPostAuthRedirectPath()).toBe('/book');
  });

  it('rejects external next paths', () => {
    window.history.replaceState(null, '', '/login?next=//evil.com');
    expect(getPostAuthRedirectPath()).toBe(ROUTES.account);
  });

  it('builds withNextParam', () => {
    expect(withNextParam('/login', '/book')).toBe('/login?next=%2Fbook');
  });

  it('preserves next across auth pages', () => {
    window.history.replaceState(null, '', '/login?next=%2Fbook');
    expect(preserveNextParam('/register')).toBe('/register?next=%2Fbook');
  });

  it('bookingEntryPath routes logged-in users to book', () => {
    expect(bookingEntryPath(true)).toBe(ROUTES.book);
    expect(bookingEntryPath(false)).toBe('/login?next=%2Fbook');
  });
});
