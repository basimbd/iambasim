import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files
import enCommon from './locales/en/common.json';
import enProjects from './locales/en/projects.json';
import enResume from './locales/en/resume.json';
import enSkills from './locales/en/skills.json';

import frCommon from './locales/fr/common.json';
import frProjects from './locales/fr/projects.json';
import frResume from './locales/fr/resume.json';
import frSkills from './locales/fr/skills.json';

// Initialize i18n if it hasn't been initialized already
if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .use(LanguageDetector)
        .use(Backend)
        .init({
            resources: {
                en: {
                    common: enCommon,
                    projects: enProjects,
                    resume: enResume,
                    skills: enSkills
                },
                fr: {
                    common: frCommon,
                    projects: frProjects,
                    resume: frResume,
                    skills: frSkills
                }
            },
            fallbackLng: 'en',
            ns: ['common', 'projects', 'resume', 'skills'],
            defaultNS: 'common',
            debug: import.meta.env.DEV,

            interpolation: {
                escapeValue: false
            },

            detection: {
                order: ['path', 'cookie', 'localStorage', 'navigator'],
                lookupFromPathIndex: 0,
                lookupFromPathMap: {
                    '/fr/': 'fr',
                    '/': 'en'
                }
            }
        });
}

export default i18n;
