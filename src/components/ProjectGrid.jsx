import { useTranslation } from 'react-i18next';
import GitHubLink from './GitHubLink';

export default function ProjectGrid() {
    const { t } = useTranslation("projects");

    const getProjects = () => {
        return t('projects', { returnObjects: true }) || [];
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6 text-text-primary dark:text-dark-text-primary">{t('title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getProjects().map((project, index) => (
                    <div key={index} className="bg-gradient-card rounded-lg overflow-hidden shadow-lg transition-all duration-150 hover:scale-[1.03] hover:shadow-xl">
                        <div className="relative p-2">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">{project.title}</h3>
                            <p className="text-text-secondary dark:text-dark-text-secondary mb-4">{project.description}</p>
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
                                <GitHubLink github_url={project.link} />
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
