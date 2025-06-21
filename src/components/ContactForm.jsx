import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import { MdGroups } from 'react-icons/md';

export default function ContactForm() {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitResult({ success: true });
            setFormState({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitResult({ success: false, error: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6 text-text-primary dark:text-dark-text-primary">
                {t('contact.title')}
            </h2>

            <div className="md:flex md:space-x-10">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <p className="mb-6 text-text-secondary dark:text-dark-text-secondary">
                        {t('contact.description')}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start">
                            <FaEnvelope className="h-6 w-6 mr-1" />
                            <div>
                                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                                    {t('contact.email')}
                                </h3>
                                <a href="mailto:mbahmed@yorku.ca" className="text-primary dark:text-dark-primary">
                                    mbahmed@yorku.ca
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <MdGroups className="h-6 w-6 mr-1" />
                            <div>
                                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                                    {t('contact.social')}
                                </h3>
                                <div className="flex space-x-3 mt-1">
                                    <a
                                        href="https://github.com/basimbd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                                    >
                                        <FaGithub className="h-6 w-6" />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/basimbd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                                    >
                                        <FaLinkedin className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <FaLocationDot className="w-6 h-6 mr-1 inline" />
                            <div>
                                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                                    {t('contact.location')}
                                </h3>
                                <p className="text-text-secondary dark:text-dark-text-secondary">Toronto, Canada</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    {submitResult?.success ? (
                        <div className="bg-accent-light/20 border-l-4 border-accent text-accent-dark dark:bg-dark-accent-light/10 dark:border-dark-accent dark:text-dark-accent-light p-4 mb-4">
                            <p>{t('contact.successMessage')}</p>
                        </div>
                    ) : submitResult?.success === false ? (
                        <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-4">
                            <p>{t('contact.errorMessage')}</p>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="bg-gradient-card p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1 text-text-primary dark:text-dark-text-primary">
                                {t('contact.form.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-secondary-light/30 dark:border-dark-secondary-light/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary dark:bg-dark-background-primary text-text-primary dark:text-dark-text-primary"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1 text-text-primary dark:text-dark-text-primary">
                                {t('contact.form.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-secondary-light/30 dark:border-dark-secondary-light/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary dark:bg-dark-background-primary text-text-primary dark:text-dark-text-primary"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium mb-1 text-text-primary dark:text-dark-text-primary">
                                {t('contact.form.message')}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-secondary-light/30 dark:border-dark-secondary-light/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary dark:bg-dark-background-primary text-text-primary dark:text-dark-text-primary"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-primary text-white px-6 py-2 rounded-md disabled:opacity-50 hover:opacity-90 transition-opacity"
                        >
                            {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
