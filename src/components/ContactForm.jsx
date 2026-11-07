import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import { MdGroups } from 'react-icons/md';

const EMPTY_FORM = { name: '', email: '', message: '' };
const LIMITS = { name: 100, email: 254, message: 5000 };

function httpErrorMessage(status) {
    if (status === 408 || status === 504) return 'timeoutMessage';
    if (status === 413) return 'tooLargeMessage';
    if (status >= 500) return 'serverErrorMessage';
    if (status >= 400) return 'rejectedMessage';
    return 'errorMessage';
}

function validateField(name, value) {
    const trimmed = value.trim();
    if (!trimmed) return 'required';
    if (value.length > LIMITS[name]) return 'tooLong';
    if (name === 'email') {
        const input = document.createElement('input');
        input.type = 'email';
        input.value = trimmed;
        if (input.validity.typeMismatch) return 'email';
    }
    return null;
}

export default function ContactForm() {
    const { t, i18n } = useTranslation();
    const registerWithNetlify = i18n.resolvedLanguage === 'en';
    const [formState, setFormState] = useState(EMPTY_FORM);
    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const [requestError, setRequestError] = useState('errorMessage');
    const [hydrated, setHydrated] = useState(false);
    const pending = useRef(false);
    const feedback = useRef(null);
    const activeRequest = useRef(null);
    const isSubmitting = status === 'submitting';

    useEffect(() => {
        setHydrated(true);
        return () => activeRequest.current?.abort();
    }, []);

    useEffect(() => {
        if (status === 'success' || status === 'error') feedback.current?.focus();
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(previous => ({ ...previous, [name]: value }));
        if (errors[name]) {
            setErrors(previous => ({ ...previous, [name]: validateField(name, value) }));
        }
        setStatus('idle');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pending.current) return;
        const form = e.currentTarget;
        const nextErrors = Object.fromEntries(
            Object.entries(formState).map(([name, value]) => [name, validateField(name, value)])
        );
        setErrors(nextErrors);
        const invalidField = Object.keys(nextErrors).find(name => nextErrors[name]);
        if (invalidField) {
            setStatus('idle');
            form.elements.namedItem(invalidField).focus();
            return;
        }

        // Capture the actual honeypot before disabling controls; never replace it with an empty value.
        const body = new URLSearchParams(new FormData(form));
        body.set('form-name', 'contact');
        for (const [name, value] of Object.entries(formState)) body.set(name, value.trim());
        pending.current = true;
        setStatus('submitting');
        const controller = new AbortController();
        activeRequest.current = controller;
        let timedOut = false;
        const timeout = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, 20000);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
                signal: controller.signal
            });
            if (!response.ok) {
                // Status gives a broad category, not Netlify's exact reason for rejection.
                setRequestError(httpErrorMessage(response.status));
                setStatus('error');
                return;
            }
            setFormState(EMPTY_FORM);
            form.reset();
            setErrors({});
            setStatus('success');
        } catch {
            if (controller.signal.aborted && !timedOut) return;
            setRequestError(timedOut ? 'timeoutMessage' : 'networkErrorMessage');
            setStatus('error');
        } finally {
            clearTimeout(timeout);
            activeRequest.current = null;
            pending.current = false;
        }
    };

    const fieldProps = name => ({
        maxLength: LIMITS[name],
        disabled: isSubmitting,
        'aria-invalid': Boolean(errors[name]),
        'aria-describedby': errors[name] ? `${name}-error` : undefined
    });

    const fieldError = name => errors[name] ? (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-700 dark:text-red-400" aria-live="polite">
            {t(`contact.validation.${errors[name]}`, { field: t(`contact.form.${name}`), max: LIMITS[name] })}
        </p>
    ) : null;

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
                            <span className="h-7 flex items-center mr-1">
                                <FaEnvelope className="h-6 w-6 mr-1" aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary">
                                    {t('contact.email')}
                                </h3>
                                <a href="mailto:basimuddintuhin@gmail.com" className="text-primary dark:text-dark-primary"
                                    title={t('socialLinks.email', { name: t('hero.shortFirstName') })}>
                                    basimuddintuhin@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <span className="h-7 flex items-center mr-1">
                                <MdGroups className="h-6 w-6 mr-1" aria-hidden="true" />
                            </span>
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
                                        title={t('socialLinks.github', { name: t('hero.shortFirstName') })}
                                    >
                                        <FaGithub className="h-6 w-6" />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/basimbd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                                        title={t('socialLinks.linkedin', { name: t('hero.shortFirstName') })}
                                    >
                                        <FaLinkedin className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <span className="h-7 flex items-center mr-1">
                                <FaLocationDot className="h-6 w-6 mr-1" aria-hidden="true" />
                            </span>
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
                    <div
                        ref={status !== 'error' ? feedback : undefined}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        tabIndex={-1}
                        className={status === 'success' ? 'bg-accent-light/20 border-l-4 border-accent text-accent-dark dark:bg-dark-accent-light/10 dark:border-dark-accent dark:text-dark-accent-light p-4 mb-4 focus:outline focus:outline-2' : 'sr-only'}
                    >
                        {status === 'success' ? t('contact.successMessage') : isSubmitting ? t('contact.form.sending') : ''}
                    </div>
                    {status === 'error' && (
                        <div ref={feedback} role="alert" tabIndex={-1} className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-4 focus:outline focus:outline-2">
                            <p>{t(`contact.${requestError}`)}</p>
                        </div>
                    )}

                    {/* Register only the English build; both locales submit to contact with the same field names. */}
                    <form name="contact" method="POST" data-netlify={registerWithNetlify ? 'true' : undefined} netlify-honeypot={registerWithNetlify ? 'bot-field' : undefined} noValidate={hydrated} aria-busy={isSubmitting} onSubmit={handleSubmit} className="bg-gradient-card p-6 rounded-lg shadow-md">
                        <input type="hidden" name="form-name" value="contact" />
                        <div hidden aria-hidden="true">
                            <label htmlFor="bot-field">{t('contact.form.honeypot')}</label>
                            <input type="text" id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" disabled={isSubmitting} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1 text-text-primary dark:text-dark-text-primary">
                                {t('contact.form.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="name"
                                {...fieldProps('name')}
                                value={formState.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-secondary-light/30 dark:border-dark-secondary-light/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary dark:bg-dark-background-primary text-text-primary dark:text-dark-text-primary"
                            />
                            {fieldError('name')}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1 text-text-primary dark:text-dark-text-primary">
                                {t('contact.form.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                {...fieldProps('email')}
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-secondary-light/30 dark:border-dark-secondary-light/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary dark:bg-dark-background-primary text-text-primary dark:text-dark-text-primary"
                            />
                            {fieldError('email')}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium mb-1 text-text-primary dark:text-dark-text-primary">
                                {t('contact.form.message')}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                {...fieldProps('message')}
                                rows="5"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-secondary-light/30 dark:border-dark-secondary-light/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary dark:bg-dark-background-primary text-text-primary dark:text-dark-text-primary"
                            ></textarea>
                            {fieldError('message')}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-primary text-white px-6 py-2 rounded-md disabled:opacity-50 hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:focus-visible:outline-dark-primary"
                        >
                            {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
