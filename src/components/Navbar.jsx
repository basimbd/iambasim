import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DarkModeToggle } from './DarkModeToggle.jsx';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currentLang = i18n.language || 'en';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

        const currentPath = window.location.pathname;
        if (lng === 'en') {
            window.location.href = currentPath.replace(/^\/fr/, '') || '/';
        } else {
            window.location.href = `/fr${currentPath === '/' ? '' : currentPath.replace(/^\/fr/, '')}`;
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-background-primary dark:bg-dark-background-primary shadow-md">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-1">
                        <a href={currentLang === 'fr' ? '/fr' : '/'} className="text-xl font-bold">
                            <span className="text-gradient-primary">Md Basim Uddin Ahmed</span>
                        </a>
                    </div>

                    {/* Navigation for larger screens */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <a href={`${currentLang === 'fr' ? '/fr' : ''}/#about`} className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
                                {t('nav.about')}
                            </a>
                            <a href={`${currentLang === 'fr' ? '/fr' : ''}/#experience`} className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
                                {t('nav.experience')}
                            </a>
                            <a href={`${currentLang === 'fr' ? '/fr' : ''}/#skills`} className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
                                {t('nav.skills')}
                            </a>
                            <a href={`${currentLang === 'fr' ? '/fr' : ''}/#projects`} className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
                                {t('nav.projects')}
                            </a>
                            <a href={`${currentLang === 'fr' ? '/fr' : ''}/#contact`} className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
                                {t('nav.contact')}
                            </a>
                            <select
                                value={currentLang}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="bg-transparent border-none cursor-pointer text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                            >
                                <option value="en">EN</option>
                                <option value="fr">FR</option>
                            </select>
                            <DarkModeToggle />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <DarkModeToggle />
                        <button onClick={toggleMenu} className="ml-2 p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation for Mobile Screen */}
            {isMenuOpen && (
                <div className="md:hidden bg-background-secondary dark:bg-dark-background-secondary px-6 py-4 space-y-3">
                    <a href={`${currentLang === 'fr' ? '/fr' : ''}/#about`} className="block text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.about')}
                    </a>
                    <a href={`${currentLang === 'fr' ? '/fr' : ''}/#experience`} className="block text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.experience')}
                    </a>
                    <a href={`${currentLang === 'fr' ? '/fr' : ''}/#skills`} className="block text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.skills')}
                    </a>
                    <a href={`${currentLang === 'fr' ? '/fr' : ''}/#projects`} className="block text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.projects')}
                    </a>
                    <a href={`${currentLang === 'fr' ? '/fr' : ''}/#contact`} className="block text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.contact')}
                    </a>
                    <select
                        value={currentLang}
                        onChange={(e) => {
                            changeLanguage(e.target.value);
                            setIsMenuOpen(false);
                        }}
                        className="block bg-transparent border-none cursor-pointer text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
                    >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                    </select>
                </div>
            )}
        </nav>
    );
}
