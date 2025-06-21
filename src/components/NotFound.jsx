import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const homeUrl = currentLang.includes('en') ? '/' : `/${currentLang}`;

    return (
        <section className="min-h-[calc(100dvh-17.6rem)] sm:min-h-[calc(100dvh-16.1rem)] md:min-h-[calc(100dvh-13.6rem)] flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-text-primary dark:text-dark-text-primary">404</h1>
            <p className="mt-4 text-text-secondary dark:text-dark-text-secondary">
                {t('notFound.title')}
            </p>
            <a href={homeUrl} className="mt-6 px-4 py-2 bg-gradient-primary rounded text-white hover:opacity-90 transition-opacity">
                {t('notFound.backToHomeButton')}
            </a>
        </section>
    );
}
