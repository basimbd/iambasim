import GitHubLink from './GitHubLink';
import CollapsibleText from './CollapsibleText';

export default function ProjectCard({ project }) {
    return (
        <div className="bg-gradient-card rounded-lg overflow-hidden shadow-lg transition-all duration-150 hover:scale-[1.03] hover:shadow-xl dark:shadow-sky-800/30">
            <div className="relative p-2">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
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
                    <GitHubLink github_url={project.link} />
                }
            </div>
        </div>
    );
}
