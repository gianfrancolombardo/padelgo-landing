import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();
const mockResetPasswordForEmail = vi.fn();
const unsubscribe = vi.fn();

vi.mock('../lib/supabase', () => ({
  isSupabaseConfigured: () => true,
  getSupabaseClient: () => ({
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signOut: mockSignOut,
      resetPasswordForEmail: mockResetPasswordForEmail,
    },
  }),
}));

function AuthProbe() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(auth.loading)}</span>
      <span data-testid="email">{auth.user?.email ?? 'none'}</span>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    mockGetSession.mockReset();
    mockOnAuthStateChange.mockReset();
    mockSignInWithPassword.mockReset();
    mockSignUp.mockReset();
    mockSignOut.mockReset();
    mockResetPasswordForEmail.mockReset();
    unsubscribe.mockReset();

    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe } },
    });
  });

  it('hydrates session on mount', async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { id: '1', email: 'player@test.com' },
        },
      },
    });

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
      expect(screen.getByTestId('email')).toHaveTextContent('player@test.com');
    });

    expect(mockOnAuthStateChange).toHaveBeenCalled();
  });

  it('exposes signIn helper', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    let capturedSignIn: ((email: string, password: string) => Promise<{ error: Error | null }>) | null = null;

    function SignInProbe() {
      const { signIn, loading } = useAuth();
      if (!loading) capturedSignIn = signIn;
      return null;
    }

    render(
      <AuthProvider>
        <SignInProbe />
      </AuthProvider>
    );

    await waitFor(() => expect(capturedSignIn).not.toBeNull());

    const result = await capturedSignIn!('player@test.com', 'secret123');

    expect(result.error).toBeNull();
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'player@test.com',
      password: 'secret123',
    });
  });
});
