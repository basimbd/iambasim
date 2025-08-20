import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard.jsx';

export default function ProjectGrid() {
    const { t } = useTranslation("projects");

    const getProjects = () => {
        return t('projects', { returnObjects: true }) || [];
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="mb-8 flex justify-center">
                <span className="text-4xl md:text-5xl font-semibold font-serif text-text-primary dark:text-dark-text-primary">{t('title')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getProjects().map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>
    );
}
