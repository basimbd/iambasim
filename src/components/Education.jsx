import { useTranslation } from 'react-i18next';
import { FaRegCalendar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export default function Education() {
    const { t } = useTranslation("resume");

    const getEducations = () => {
        return t('educations', { returnObjects: true }) || [];
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div>
                <h2 className="text-3xl font-semibold mb-6 text-text-primary dark:text-dark-text-primary">
                    {t('educationTitle')}
                </h2>

                {getEducations().map((education, index) => (
                    <div key={index} className="mb-8 border-l-4 border-primary dark:border-dark-primary pl-4 ml-2">
                        <h4 className="flex items-center flex-wrap text-xl font-medium text-text-primary dark:text-dark-text-primary">
                            <a href={education.institute_site} target="_blank" rel="noopener noreferrer"
                                className="text-primary dark:text-dark-primary hover:underline">
                                {education.institution}
                            </a>
                            {education.location &&
                                <span className="inline-flex items-center ml-2 whitespace-nowrap flex-shrink-0 text-text-secondary dark:text-dark-text-secondary text-xs">
                                    <FaLocationDot className="w-3 h-3 mr-1 inline" />
                                    <span>{education.location}</span>
                                </span>}
                        </h4>
                        <div className="flex flex-col items-start gap-2 
                        sm:flex-row sm:justify-between sm:items-center sm:gap-0">
                            <span className="text-text-secondary dark:text-dark-text-secondary">
                                {education.degree}
                            </span>
                            <span className="inline-flex items-center 
                            bg-primary-light/20 dark:bg-dark-primary-light/20 shadow-md 
                            text-primary-dark dark:text-dark-primary-light text-sm 
                            px-3 py-1 rounded-full mr-2 mb-2">
                                <FaRegCalendar className="w-4 h-4 mr-1" />
                                {education.period}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
