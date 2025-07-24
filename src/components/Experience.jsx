import { useTranslation } from 'react-i18next';
import { FaRegCalendar } from "react-icons/fa6";
import { LogoPill } from './TechPill.jsx';
import { FaLocationDot } from 'react-icons/fa6';

export default function Experience() {
    const { t } = useTranslation("resume");

    const getJobs = () => {
        return t('jobs', { returnObjects: true }) || [];
    };

    const getResearchProjects = () => {
        return t('researchProjects', { returnObjects: true }) || [];
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="mb-6 flex justify-center">
                <span className="text-4xl md:text-5xl font-semibold font-serif text-text-primary dark:text-dark-text-primary">{t('title')}</span>
            </h2>

            <div className="mb-12 p-4 rounded-xl shadow-xl shadow-sky-800/10 dark:shadow-sky-800/30">
                <h3 className="text-2xl font-medium mb-4 text-text-primary dark:text-dark-text-primary">
                    💼{t('profExperience')}
                </h3>

                {getJobs().map((job, index) => (
                    <div key={index} className="mb-8 border-l-4 border-primary dark:border-dark-primary pl-4 ml-2">
                        <h4 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">
                            {job.title}
                        </h4>
                        <div className="flex flex-col items-start gap-2 
                        sm:flex-row sm:justify-between sm:items-center sm:gap-0">
                            <div>
                                <a href={job.company_site} target="_blank" rel="noopener noreferrer"
                                    className="text-primary dark:text-dark-primary hover:underline">
                                    {job.company}
                                </a>
                                <span className="ml-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                                    <FaLocationDot className="w-3 h-3 mr-1 inline" />
                                    <span>{job.location}</span>
                                </span>
                            </div>
                            <span className="inline-flex items-center 
                            bg-primary-light/20 dark:bg-dark-primary-light/20 shadow-md
                            text-primary-dark dark:text-dark-primary-light text-sm 
                            px-3 py-1 rounded-full mb-1 sm:mr-2 sm:mb-2">
                                <FaRegCalendar className="w-4 h-4 mr-1 inline-block" />
                                {job.period}
                            </span>
                        </div>
                        <p className="mb-2 text-text-secondary dark:text-dark-text-secondary">
                            {job.introduction}
                        </p>
                        <ul className="list-disc list-outside ml-4 space-y-1">
                            {job.descriptions?.map((desc, descIndex) => (
                                <li
                                    key={descIndex}
                                    className="text-text-secondary dark:text-dark-text-secondary"
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                >
                                </li>
                            ))}
                        </ul>
                        {job.techStack && (
                            <div className="mt-4">
                                <div className="flex flex-wrap">
                                    {/* Text-only pills (uncomment to use these) */}
                                    {/* {job.techStack.map((tech, techIndex) => (
                                        <TextPill key={techIndex} tech={tech} />
                                    ))} */}

                                    {/* Logo + text pills */}
                                    {job.techStack.map((tech, techIndex) => (
                                        <LogoPill key={techIndex} tech={tech} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {getResearchProjects().length > 0 && (
                <div className="mb-12 p-4 rounded-xl shadow-xl shadow-sky-800/10 dark:shadow-sky-800/30">
                    <h3 className="text-2xl font-medium mb-4 text-text-primary dark:text-dark-text-primary">
                        💡{t('researchExperience')}
                    </h3>
                {getResearchProjects().map((project, index) => (
                    <div key={index} className="mb-8 border-l-4 border-primary dark:border-dark-primary pl-4 ml-2">
                        <h4 className="text-xl font-medium text-text-primary dark:text-dark-text-primary">
                            {project.title}
                        </h4>
                        <div className="flex flex-col items-start gap-2 
                        sm:flex-row sm:justify-between sm:items-center sm:gap-0">
                            <div>
                                <a href={project.company_site} target="_blank" rel="noopener noreferrer"
                                    className="text-primary dark:text-dark-primary hover:underline">
                                    {project.company}
                                </a>
                                <span className="ml-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                                    <FaLocationDot className="w-3 h-3 mr-1 inline" />
                                    <span>{project.location}</span>
                                </span>
                            </div>
                            <span className="inline-flex items-center 
                            bg-primary-light/20 dark:bg-dark-primary-light/20 shadow-md
                            text-primary-dark dark:text-dark-primary-light text-sm 
                            px-3 py-1 rounded-full mb-1 sm:mr-2 sm:mb-2">
                                <FaRegCalendar className="w-4 h-4 mr-1 inline-block" />
                                {project.period}
                            </span>
                        </div>
                        <p className="mb-2 text-text-secondary dark:text-dark-text-secondary"
                            dangerouslySetInnerHTML={{ __html: project.introduction }}
                        >
                        </p>
                        <ul className="list-disc list-outside ml-4 space-y-1">
                            {project.descriptions?.map((desc, descIndex) => (
                                <li
                                    key={descIndex}
                                    className="text-text-secondary dark:text-dark-text-secondary"
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                >
                                </li>
                            ))}
                        </ul>
                        {project.techStack && (
                            <div className="mt-4">
                                <div className="flex flex-wrap">
                                    {project.techStack.map((tech, techIndex) => (
                                        <LogoPill key={techIndex} tech={tech} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            )}

            <div className="mt-8">
                <a
                    href="/assets/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                    {t('downloadButton')}
                </a>
            </div>
        </div>
    );
}
