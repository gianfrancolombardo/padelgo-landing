import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthGuard from './AuthGuard';

const mockNavigate = vi.fn();
const mockUseAuth = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('../../lib/navigation', () => ({
  navigateTo: (path: string) => mockNavigate(path),
}));

describe('AuthGuard', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseAuth.mockReset();
  });

  it('shows loading spinner while auth is loading', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });

    render(
      <AuthGuard>
        <p>Protected</p>
      </AuthGuard>
    );

    expect(screen.getByTestId('auth-guard-loading')).toBeInTheDocument();
    expect(screen.queryByText('Protected')).not.toBeInTheDocument();
  });

  it('redirects unauthenticated users to login', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });

    render(
      <AuthGuard>
        <p>Protected</p>
      </AuthGuard>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(screen.queryByText('Protected')).not.toBeInTheDocument();
  });

  it('renders children for authenticated users', () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'user-1', email: 'player@test.com' },
      loading: false,
    });

    render(
      <AuthGuard>
        <p>Protected</p>
      </AuthGuard>
    );

    expect(screen.getByText('Protected')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
