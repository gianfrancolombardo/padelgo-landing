import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import { renderWithLanguage } from '../../tests/test-utils';
import { ROUTES } from '../../i18n/routes';

const mockSignIn = vi.fn();
const mockResetPassword = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    session: null,
    loading: false,
    configured: true,
    signIn: mockSignIn,
    signUp: vi.fn(),
    signOut: vi.fn(),
    resetPassword: mockResetPassword,
  }),
}));

vi.mock('../../lib/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/navigation')>();
  return {
    ...actual,
    navigateTo: (path: string) => mockNavigate(path),
    getPostAuthRedirectPath: () => ROUTES.account,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    mockSignIn.mockReset();
    mockResetPassword.mockReset();
    mockNavigate.mockReset();
  });

  it('renders login form', () => {
    renderWithLanguage(<LoginPage />);
    expect(screen.getByPlaceholderText(/correo|email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña|password/i)).toBeInTheDocument();
  });

  it('submits credentials and navigates on success', async () => {
    mockSignIn.mockResolvedValue({ error: null });
    const user = userEvent.setup();

    renderWithLanguage(<LoginPage />);

    await user.type(screen.getByPlaceholderText(/correo|email/i), 'player@test.com');
    await user.type(screen.getByPlaceholderText(/contraseña|password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /entrar|sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('player@test.com', 'secret123');
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.account);
    });
  });

  it('shows error message on invalid credentials', async () => {
    mockSignIn.mockResolvedValue({ error: new Error('Invalid login credentials') });
    const user = userEvent.setup();

    renderWithLanguage(<LoginPage />);

    await user.type(screen.getByPlaceholderText(/correo|email/i), 'wrong@test.com');
    await user.type(screen.getByPlaceholderText(/contraseña|password/i), 'badpass');
    await user.click(screen.getByRole('button', { name: /entrar|sign in/i }));

    expect(await screen.findByText(/incorrectos|incorrect/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('sends password reset email', async () => {
    mockResetPassword.mockResolvedValue({ error: null });
    const user = userEvent.setup();

    renderWithLanguage(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /olvidaste|forgot/i }));
    await user.type(screen.getByPlaceholderText(/correo|email/i), 'player@test.com');
    await user.click(screen.getByRole('button', { name: /recuperación|recovery/i }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('player@test.com');
      expect(screen.getByText(/recibirás|receive/i)).toBeInTheDocument();
    });
  });
});
