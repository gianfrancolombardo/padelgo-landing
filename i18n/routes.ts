export const ROUTES = {
  home: '/',
  clubs: '/clubs',
  pascalbox: '/pascalbox',
  slinger: '/slinger',
  lockers: '/lockers',
  ballLaunchers: '/ball-launchers',
} as const;

/** Spanish / legacy paths redirect to canonical English URLs */
export const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  '/clubes': ROUTES.clubs,
  '/lanzadoras': ROUTES.ballLaunchers,
  '/lanzadoras-de-pelotas': ROUTES.ballLaunchers,
  '/lanzadoras-pelotas': ROUTES.ballLaunchers,
  '/lanzapelotas': ROUTES.ballLaunchers,
};

export type AppRoute =
  | 'home'
  | 'clubs'
  | 'pascalbox'
  | 'slinger'
  | 'lockers'
  | 'ballLaunchers'
  | 'preview';

export function resolveRoute(pathname: string, hash: string): AppRoute {
  if (hash === '#preview') return 'preview';
  if (pathname === ROUTES.clubs) return 'clubs';
  if (pathname === ROUTES.pascalbox) return 'pascalbox';
  if (pathname === ROUTES.slinger) return 'slinger';
  if (pathname === ROUTES.lockers) return 'lockers';
  if (pathname === ROUTES.ballLaunchers) return 'ballLaunchers';
  return 'home';
}

export function redirectLegacyPath(pathname: string): string | null {
  return LEGACY_PATH_REDIRECTS[pathname] ?? null;
}
