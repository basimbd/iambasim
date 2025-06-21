import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.js';

export function I18nProvider({ children, lang }) {
    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
}
