import { useTranslation } from 'react-i18next';

export default function Publications() {
    const { t } = useTranslation('resume');
    const publications = t('publications', { returnObjects: true }) || [];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="mb-8 flex justify-center">
                <span className="text-4xl md:text-5xl font-semibold font-serif text-text-primary dark:text-dark-text-primary">
                    {t('publicationsTitle')}
                </span>
            </h2>
            <div className="space-y-6">
                {publications.map((publication, index) => (
                    <article
                        key={index}
                        className="rounded-xl border-l-4 border-primary dark:border-dark-primary p-4 shadow-xl shadow-sky-800/10 dark:shadow-sky-800/30"
                    >
                        <h3 className="text-base sm:text-xl font-medium leading-snug text-text-primary dark:text-dark-text-primary">
                            {publication.title}
                        </h3>
                        <p
                            className="mt-2 text-xs sm:text-sm text-text-secondary dark:text-dark-text-secondary"
                            dangerouslySetInnerHTML={{ __html: publication.authors }}
                        >
                        </p>
                        <p className="mt-1 text-sm sm:text-base text-text-secondary dark:text-dark-text-secondary">
                            <strong>{publication.venue}</strong> · {publication.details}
                        </p>
                        {publication.contributionNote && (
                            <p className="mt-2 text-[0.7rem] sm:text-xs text-text-secondary dark:text-dark-text-secondary">
                                {publication.contributionNote}
                            </p>
                        )}
                        {publication.awards?.map((award) => (
                            <div key={award} className="mt-3">
                                <span className="inline-block rounded-full bg-accent-light/30 px-3 py-1 text-xs sm:text-sm font-medium text-text-secondary dark:bg-dark-accent-light/20 dark:text-dark-text-secondary">
                                    🏆 {award}
                                </span>
                            </div>
                        ))}
                        <div className="mt-3 flex flex-wrap gap-3">
                            {publication.links?.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm sm:text-base text-primary dark:text-dark-primary hover:underline"
                                >
                                    {link.label} ↗
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
