import { useState } from 'react';
import GitHubLink from './GitHubLink';
import CollapsibleText from './CollapsibleText';
import GenericModal from './GenericModal.jsx';

export default function ProjectCard({ project }) {
    const [open, setOpen] = useState(false);
    const handleCardClick = () => {
        if (open) return;
        setOpen(true);
    };

    return (
        <div className="bg-gradient-card rounded-lg overflow-hidden shadow-lg transition-all duration-150
            hover:scale-[1.03] hover:cursor-pointer hover:shadow-xl dark:shadow-sky-800/30"
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={(e) => (e.key === 'Enter' && e.target === e.currentTarget) && handleCardClick()}
        >
            <GenericModal keepMounted open={open} onClose={() => setOpen(false)} title={project.title}>
                <section className="grid gap-6 md:grid-cols-5">
                    {/* Left column: image + title + pills */}
                    <div className="md:col-span-2">
                        <div className="rounded-lg overflow-hidden bg-gradient-card">
                            <div className="relative w-full h-full aspect-square">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h2 className="mt-4 text-2xl font-semibold text-text-primary dark:text-dark-text-primary">
                            {project.title}
                        </h2>

                        {Array.isArray(project.tech) && project.tech.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center rounded px-2 py-1 text-xs
                                        bg-accent-light/20 text-accent-dark
                                        dark:bg-dark-accent-light/20 dark:text-dark-accent-light"
                                    >{t}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right column: description / bullet points */}
                    <div className="md:col-span-3">
                        {/* Prefer bullet points if provided */}
                        {Array.isArray(project.highlights) && project.highlights.length > 0 ? (
                            <ul className="space-y-2 list-disc pl-5 text-text-secondary dark:text-dark-text-secondary">
                                {project.highlights.map((item, idx) => (
                                    <li key={idx} className="leading-6">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : project.descriptionHtml ? (
                            <div
                                className="prose prose-sm md:prose-base max-w-none
                                text-text-secondary dark:text-dark-text-secondary
                                prose-headings:text-text-primary dark:prose-headings:text-dark-text-primary"
                                // ensure the HTML that is passed is trusted/sanitized
                                dangerouslySetInnerHTML={{ __html: project.descriptionHtml }}
                            />
                        ) : (
                            <p className="text-text-secondary dark:text-dark-text-secondary">
                                No additional details provided.
                            </p>
                        )}
                    </div>
                </section>
            </GenericModal>
            <div className="relative p-2">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">{project.title}</h3>

                <CollapsibleText text={project.description} lines={4} className="mb-6" />

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="bg-accent-light/20 text-accent-dark dark:bg-dark-accent-light/20 dark:text-dark-accent-light text-xs px-2 py-1 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                {project.link &&
                    <GitHubLink github_url={project.link} title={`${project.title} source code on GitHub`} />
                }
            </div>
        </div>
    );
}
