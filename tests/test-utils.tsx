import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';

export function renderWithLanguage(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
