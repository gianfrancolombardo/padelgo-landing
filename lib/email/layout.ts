import { EMAIL_BRAND, EMAIL_FOOTER, renderEmailBrandWordmark, type EmailLocale } from './brand';

export interface EmailFact {
  label: string;
  value: string;
}

export interface EmailCta {
  label: string;
  href: string;
}

export interface VoleaEmailLayoutInput {
  locale: EmailLocale;
  preheader?: string;
  headline: string;
  bodyParagraphs: string[];
  facts?: EmailFact[];
  cta?: EmailCta;
  secondaryNote?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function renderVoleaEmail(input: VoleaEmailLayoutInput): string {
  const { colors } = EMAIL_BRAND;
  const preheader = input.preheader ? escapeHtml(input.preheader) : '';
  const headline = escapeHtml(input.headline);
  const paragraphs = input.bodyParagraphs
    .map((p) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${colors.textMuted};">${escapeHtml(p)}</p>`)
    .join('');
  const facts = (input.facts ?? [])
    .map(
      (fact) => `
        <tr>
          <td style="padding:8px 0;color:${colors.textMuted};font-size:13px;width:35%;">${escapeHtml(fact.label)}</td>
          <td style="padding:8px 0;color:${colors.text};font-size:14px;font-weight:600;">${escapeHtml(fact.value)}</td>
        </tr>`
    )
    .join('');
  const factsBlock = facts
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;border-top:1px solid ${colors.border};border-bottom:1px solid ${colors.border};">${facts}</table>`
    : '';
  const cta = input.cta
    ? `<a href="${escapeHtml(input.cta.href)}" style="display:inline-block;margin-top:8px;background:${colors.primary};color:#020202;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:14px;letter-spacing:0.04em;">${escapeHtml(input.cta.label)}</a>`
    : '';
  const secondary = input.secondaryNote
    ? `<p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:${colors.textMuted};">${escapeHtml(input.secondaryNote)}</p>`
    : '';
  const footer = escapeHtml(EMAIL_FOOTER[input.locale]);

  return `<!DOCTYPE html>
<html lang="${input.locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${headline}</title>
</head>
<body style="margin:0;padding:0;background:${colors.background};">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.background};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${colors.surface};border:1px solid ${colors.border};border-radius:24px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 12px;">
              <p style="margin:0 0 8px;font-size:24px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;font-family:'Bebas Neue',Arial,Helvetica,sans-serif;line-height:1;">${renderEmailBrandWordmark()}</p>
              <h1 style="margin:0;font-size:28px;line-height:1.1;color:${colors.text};font-family:Arial,Helvetica,sans-serif;letter-spacing:0.03em;text-transform:uppercase;">${headline}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              ${paragraphs}
              ${factsBlock}
              ${cta}
              ${secondary}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background:#0B0D0B;border-top:1px solid ${colors.border};">
              <p style="margin:0;font-size:11px;line-height:1.5;color:${colors.textMuted};">${footer}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
