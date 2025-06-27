import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from '../i18n.js';

export function I18nProvider({ children, lang }) {
    const i18n = useMemo(() => createI18nInstance(lang), [lang]);

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
}
