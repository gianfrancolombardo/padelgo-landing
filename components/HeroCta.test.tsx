import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroCta from './HeroCta';
import { LanguageProvider } from '../i18n/LanguageContext';
import { ROUTES } from '../i18n/routes';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

describe('HeroCta', () => {
  it('links primary CTA to booking funnel when logged out', () => {
    render(
      <LanguageProvider>
        <HeroCta variant="hero" />
      </LanguageProvider>
    );

    const primary = screen.getByRole('link', { name: /reservar|book/i });
    expect(primary).toHaveAttribute('href', `/login?next=${encodeURIComponent(ROUTES.book)}`);
  });
});
