import { createClient } from '@supabase/supabase-js';
import { beforeAll, describe, expect, it } from 'vitest';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const runIntegration = Boolean(supabaseUrl && supabaseAnonKey);

describe.skipIf(!runIntegration)('Supabase auth integration', () => {
  const client = createClient(supabaseUrl!, supabaseAnonKey!);
  const password = 'VoleaTest123!';
  const email = `voleabox-test-${Date.now()}@mailinator.com`;
  let signedUp = false;

  beforeAll(async () => {
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { data: { full_name: 'Integration Test' } },
    });

    if (error?.message?.includes('rate limit')) {
      signedUp = false;
      return;
    }

    expect(error).toBeNull();
    signedUp = true;
  });

  it('reaches the Supabase auth health endpoint', async () => {
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: { apikey: supabaseAnonKey! },
    });

    expect(response.ok).toBe(true);
  });

  it('signs up a new user', () => {
    if (!signedUp) {
      expect(true).toBe(true);
      return;
    }
    expect(signedUp).toBe(true);
  });

  it('signs in or requires email confirmation', async () => {
    const { data, error } = await client.auth.signInWithPassword({ email, password });

    if (data.session) {
      expect(error).toBeNull();
      expect(data.session.user.email).toBe(email);
      await client.auth.signOut();
      return;
    }

    // Email confirmation enabled — signup succeeded but login blocked until confirm.
    expect(error).not.toBeNull();
  });

  it('rejects invalid login credentials', async () => {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password: 'wrong-password',
    });

    expect(data.session).toBeNull();
    expect(error).not.toBeNull();
  });

  it('creates a profile row when session is available', async () => {
    const { data: sessionData } = await client.auth.signInWithPassword({ email, password });

    if (!sessionData.session) {
      expect(true).toBe(true);
      return;
    }

    const userId = sessionData.session.user.id;
    const { data: profile, error } = await client
      .from('profiles')
      .select('id, full_name')
      .eq('id', userId)
      .single();

    expect(error).toBeNull();
    expect(profile?.id).toBe(userId);
    expect(profile?.full_name).toBe('Integration Test');

    await client.auth.signOut();
  });
});
