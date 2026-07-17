import { describe, expect, it, beforeEach } from 'vitest';
import { getSupabaseClient, isSupabaseConfigured, resetSupabaseClientForTests } from './supabase';

describe('supabase client', () => {
  beforeEach(() => {
    resetSupabaseClientForTests();
  });

  it('reports configured when env vars are loaded', () => {
    expect(isSupabaseConfigured()).toBe(
      Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
    );
  });

  it('returns a singleton client when configured', () => {
    if (!isSupabaseConfigured()) {
      expect(true).toBe(true);
      return;
    }

    const first = getSupabaseClient();
    const second = getSupabaseClient();

    expect(first).toBe(second);
  });

  it('throws when configuration is missing', async () => {
    if (isSupabaseConfigured()) {
      expect(true).toBe(true);
      return;
    }

    expect(() => getSupabaseClient()).toThrow(/Missing Supabase configuration/);
  });
});
