import { ROUTES } from '../i18n/routes';

export function navigateTo(path: string): void {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function getPostAuthRedirectPath(defaultPath: string = ROUTES.account): string {
  const next = new URLSearchParams(window.location.search).get('next');
  if (next && next.startsWith('/') && !next.startsWith('//')) {
    return next;
  }
  return defaultPath;
}

export function withNextParam(path: string, next?: string): string {
  if (!next) return path;
  return `${path}?next=${encodeURIComponent(next)}`;
}

export function preserveNextParam(targetPath: string): string {
  if (typeof window === 'undefined') return targetPath;
  const next = new URLSearchParams(window.location.search).get('next');
  return withNextParam(targetPath, next ?? undefined);
}

export function bookingEntryPath(isAuthenticated: boolean): string {
  return isAuthenticated ? ROUTES.book : withNextParam(ROUTES.login, ROUTES.book);
}

