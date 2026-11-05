import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GitHubLink from './GitHubLink';
import CollapsibleText from './CollapsibleText';
import GenericModal from './GenericModal.jsx';

function ProjectVisual({ project, modal = false }) {
    const sizeClasses = modal ? 'aspect-[4/3]' : 'h-44 sm:h-48';

    if (project.image) {
        return (
            <img
                src={project.image}
                alt=""
                loading="lazy"
                className={`w-full object-cover ${sizeClasses}`}
            />
        );
    }

    return (
        <div
            className={`flex w-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary-light/10 to-accent-light/20 p-6 text-center dark:from-dark-primary/20 dark:via-dark-background-card dark:to-dark-accent/20 ${sizeClasses}`}
            aria-hidden="true"
        >
            <span className="max-w-xs text-sm font-semibold uppercase tracking-[0.16em] text-primary-dark dark:text-dark-primary-light">
                {modal ? project.type : project.title.split(' — ')[0]}
            </span>
        </div>
    );
}

export default function ProjectCard({ project }) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('projects');
    const handleCardClick = () => {
        if (open) return;
        setOpen(true);
    };

    return (
        <>
            <GenericModal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                title={project.title}
                closeText={t('close')}
            >
                <section className="grid gap-5 md:grid-cols-5 md:gap-6">
                    <div className="md:col-span-2">
                        <div className="overflow-hidden rounded-lg bg-gradient-card">
                            <ProjectVisual project={project} modal />
                        </div>

                        <p className="mt-4 text-sm font-medium text-primary dark:text-dark-primary">
                            {project.date}
                        </p>
                        <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                            {project.type}
                        </p>

                        {Array.isArray(project.tech) && project.tech.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="inline-flex items-center rounded bg-accent-light/20 px-2 py-1 text-xs text-accent-dark dark:bg-dark-accent-light/20 dark:text-dark-accent-light"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <p className="leading-7 text-text-secondary dark:text-dark-text-secondary">
                            {project.description}
                        </p>

                        {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                            <ul className="mt-5 list-disc space-y-2 pl-5 text-text-secondary dark:text-dark-text-secondary">
                                {project.highlights.map((item) => (
                                    <li key={item} className="leading-6">{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </GenericModal>

            <article
                className="flex h-full flex-col overflow-hidden rounded-lg bg-gradient-card shadow-lg transition-all duration-150 hover:scale-[1.03] hover:cursor-pointer hover:shadow-xl dark:shadow-sky-800/30"
                role="button"
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(event) => (
                    event.key === 'Enter' && event.target === event.currentTarget
                ) && handleCardClick()}
            >
                <ProjectVisual project={project} />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                        <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-text-primary dark:text-dark-text-primary sm:text-xl">
                            {project.title}
                        </h3>
                        {project.link && (
                            <GitHubLink
                                github_url={project.link}
                                title={t('sourceCode', { title: project.title })}
                                className="shrink-0"
                            />
                        )}
                    </div>

                    <CollapsibleText text={project.description} lines={4} className="mt-3 mb-6 text-sm" />

                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="rounded bg-accent-light/20 px-2 py-1 text-xs text-accent-dark dark:bg-dark-accent-light/20 dark:text-dark-accent-light"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                </div>
            </article>
        </>
    );
}
