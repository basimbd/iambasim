import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="mt-20 py-6 border-t border-secondary-light/20 dark:border-dark-secondary-light/20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-text-secondary dark:text-dark-text-secondary">
                            © {new Date().getFullYear()} Md Basim Uddin Ahmed. {t('footer.rights')}
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/basimbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                        >
                            <FaGithub className="h-6 w-6" />
                        </a>
                        <a
                            href="https://linkedin.com/in/basimbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                        >
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                        <a
                            href="mailto:mbahmed@yorku.ca"
                            aria-label="Email"
                            className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                        >
                            <FaEnvelope className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
