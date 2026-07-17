import { describe, expect, it } from 'vitest';
import { renderVoleaEmail } from './layout';

describe('renderVoleaEmail', () => {
  it('renders brand shell with headline and CTA', () => {
    const html = renderVoleaEmail({
      locale: 'es',
      headline: 'Reserva confirmada',
      bodyParagraphs: ['Tu sesión está lista.'],
      cta: { label: 'Ver reservas', href: 'https://voleabox.com/account' },
    });

    expect(html).toContain('#3BFF76');
    expect(html).toContain('Reserva confirmada');
    expect(html).toContain('https://voleabox.com/account');
    expect(html).toContain('>VOLEA</span><span style="color:#3BFF76;">BOX</span>');
  });

  it('escapes user-provided HTML', () => {
    const html = renderVoleaEmail({
      locale: 'en',
      headline: 'Test',
      bodyParagraphs: ['<script>alert(1)</script>'],
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
