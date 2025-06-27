import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from './locales/en/common.json';
import enProjects from './locales/en/projects.json';
import enResume from './locales/en/resume.json';
import enSkills from './locales/en/skills.json';

import frCommon from './locales/fr/common.json';
import frProjects from './locales/fr/projects.json';
import frResume from './locales/fr/resume.json';
import frSkills from './locales/fr/skills.json';

export function createI18nInstance(lang = 'en') {
    const instance = i18n.createInstance();
    instance
        .use(initReactI18next)
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
            lng: lang,
            fallbackLng: 'en',
            ns: ['common', 'projects', 'resume', 'skills'],
            defaultNS: 'common',
            interpolation: { escapeValue: false },
            react: { useSuspense: false }
        });
    return instance;
}
