/** VoleaBox transactional email brand tokens — keep aligned with docs/brand/brandbook.md */
export const EMAIL_BRAND = {
  name: 'VoleaBox',
  colors: {
    background: '#050505',
    surface: '#1A1D1A',
    primary: '#3BFF76',
    text: '#FAFAFA',
    textMuted: '#D1D5DB',
    border: '#2A2D2A',
  },
  fromDefault: 'VoleaBox <onboarding@resend.dev>',
} as const;

export type EmailLocale = 'es' | 'en';

export const EMAIL_FOOTER = {
  es: 'VoleaBox — entrena con máquina e IA en tu club.',
  en: 'VoleaBox — train with machine and AI at your club.',
} as const;

/** Matches site header: VOLEA (white) + BOX (green). */
export function renderEmailBrandWordmark(): string {
  const { colors } = EMAIL_BRAND;
  return `<span style="color:${colors.text};">VOLEA</span><span style="color:${colors.primary};">BOX</span>`;
}
