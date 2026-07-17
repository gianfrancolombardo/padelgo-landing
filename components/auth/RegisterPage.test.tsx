import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from './RegisterPage';
import { renderWithLanguage } from '../../tests/test-utils';
import { ROUTES } from '../../i18n/routes';

const mockSignUp = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    session: null,
    loading: false,
    configured: true,
    signIn: vi.fn(),
    signUp: mockSignUp,
    signOut: vi.fn(),
    resetPassword: vi.fn(),
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

describe('RegisterPage', () => {
  beforeEach(() => {
    mockSignUp.mockReset();
    mockNavigate.mockReset();
  });

  it('renders registration form', () => {
    renderWithLanguage(<RegisterPage />);
    expect(screen.getByPlaceholderText(/correo|email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña|password/i)).toBeInTheDocument();
  });

  it('registers user and navigates when session is returned', async () => {
    mockSignUp.mockResolvedValue({ error: null, needsConfirmation: false });
    const user = userEvent.setup();

    renderWithLanguage(<RegisterPage />);

    await user.type(screen.getByPlaceholderText(/nombre|full name/i), 'Test Player');
    await user.type(screen.getByPlaceholderText(/correo|email/i), 'new@test.com');
    await user.type(screen.getByPlaceholderText(/contraseña|password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /registrarme|create account/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('new@test.com', 'password123', 'Test Player');
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.account);
    });
  });

  it('shows email confirmation message when required', async () => {
    mockSignUp.mockResolvedValue({ error: null, needsConfirmation: true });
    const user = userEvent.setup();

    renderWithLanguage(<RegisterPage />);

    await user.type(screen.getByPlaceholderText(/correo|email/i), 'confirm@test.com');
    await user.type(screen.getByPlaceholderText(/contraseña|password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /registrarme|create account/i }));

    expect(await screen.findByText(/bandeja|inbox/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows error for duplicate email', async () => {
    mockSignUp.mockResolvedValue({ error: new Error('User already registered'), needsConfirmation: false });
    const user = userEvent.setup();

    renderWithLanguage(<RegisterPage />);

    await user.type(screen.getByPlaceholderText(/correo|email/i), 'taken@test.com');
    await user.type(screen.getByPlaceholderText(/contraseña|password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /registrarme|create account/i }));

    expect(await screen.findByText(/already registered|ya está registrado/i)).toBeInTheDocument();
  });
});
