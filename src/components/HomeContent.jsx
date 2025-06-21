import { useTranslation } from 'react-i18next';
import RandomTextBackground from './RandomTextBackground.jsx';
import Experience from './Experience.jsx';
import SkillGrid from './SkillGrid.jsx';
import ProjectGrid from './ProjectGrid.jsx';
import Education from './Education.jsx';
import ContactForm from './ContactForm.jsx';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa6';
import { SiSpring } from 'react-icons/si';

export default function HomeContent() {
    const { t } = useTranslation();

    return (
        <>
            <section id="hero" className="min-h-[calc(100dvh-4rem)] relative flex items-center overflow-hidden bg-background-secondary dark:bg-dark-background-secondary">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-950">
                        <RandomTextBackground />

                        <div className="invisible sm:visible tech-icon-container absolute inset-0 overflow-hidden">
                            <div className="tech-icon text-blue-700 dark:text-blue-500 opacity-20 dark:opacity-30" style={{ top: '25%', right: '15%' }}>
                                <FaReact className="icon-float" />
                            </div>
                            <div className="tech-icon text-yellow-600 dark:text-yellow-500 opacity-20 dark:opacity-30" style={{ top: '65%', right: '25%' }}>
                                <FaNodeJs className="icon-float-delay" />
                            </div>
                            <div className="tech-icon text-blue-800 dark:text-blue-400 opacity-20 dark:opacity-30" style={{ top: '40%', left: '15%' }}>
                                <FaPython className="icon-float-alt" />
                            </div>
                            <div className="tech-icon text-orange-600 dark:text-orange-400 opacity-20 dark:opacity-30" style={{ top: '80%', left: '20%' }}>
                                <FaDatabase className="icon-float-delay-alt" />
                            </div>
                            <div className="tech-icon text-lime-600 dark:text-lime-400 opacity-20 dark:opacity-30" style={{ top: '20%', left: '40%' }}>
                                <SiSpring className="icon-float-delay-alt" />
                            </div>
                        </div>

                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute h-1 w-1 rounded-full bg-blue-400 top-1/4 left-1/4 animate-pulse-slow"></div>
                            <div className="absolute h-1 w-1 rounded-full bg-blue-400 top-3/4 left-3/4 animate-pulse-slower"></div>
                            <div className="absolute h-1 w-1 rounded-full bg-blue-400 top-1/2 left-1/5 animate-pulse-slow"></div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gradient-primary">
                        Md Basim Uddin Ahmed
                    </h1>
                    <p className="text-2xl mb-6 text-text-secondary dark:text-dark-text-secondary">{t('hero.tagline')}</p>
                    <p className="text-xl md:px-12 lg:px-24 xl:px-36 mb-8 text-text-secondary dark:text-dark-text-secondary">
                        {t('hero.catchphrase')}
                    </p>

                    <div className="flex justify-center space-x-6 mb-12">
                        <a href="https://github.com/basimbd" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary dark:hover:text-primary transition-colors">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com/in/basimbd" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary dark:hover:text-primary transition-colors">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:mbahmed@yorku.ca" className="text-2xl hover:text-primary dark:hover:text-primary transition-colors">
                            <FaEnvelope />
                        </a>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-10 rounded-full border-2 border-text-primary dark:border-dark-text-primary flex justify-center items-start p-1">
                            <div className="w-1 h-2 bg-text-primary dark:bg-dark-text-primary rounded-full animate-scroll-down"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 bg-background-primary dark:bg-dark-background-primary">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold mb-6 text-text-primary dark:text-dark-text-primary">
                        {t('about.title')}
                    </h2>
                    <div className="md:flex items-center">
                        <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                            <img
                                src="/images/profile.jpg"
                                alt="Md Basim Uddin Ahmed"
                                className="rounded-full w-48 h-48 mx-auto object-cover border-4 border-background-primary dark:border-dark-background-card shadow-lg"
                            />
                        </div>
                        <div className="md:w-2/3 shadow-lg rounded-xl p-6 dark:bg-dark-background-card">
                            <p className="mb-4 text-text-secondary dark:text-dark-text-secondary">{t('about.paragraph1')}</p>
                            <p className="mb-4 text-text-secondary dark:text-dark-text-secondary">{t('about.paragraph2')}</p>
                            <p className="text-text-secondary dark:text-dark-text-secondary">{t('about.paragraph3')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>
            <section id="experience" className="py-20 bg-background-primary dark:bg-dark-background-primary">
                <Experience />
            </section>
            <div className="section-divider"></div>
            <section id="skills" className="py-20 bg-background-primary dark:bg-dark-background-primary">
                <SkillGrid />
            </section>
            <div className="section-divider"></div>
            <section id="projects" className="py-20 bg-background-primary dark:bg-dark-background-primary">
                <ProjectGrid />
            </section>
            <div className="section-divider"></div>
            <section id="education" className="py-20 bg-background-primary dark:bg-dark-background-primary">
                <Education />
            </section>
            <div className="section-divider"></div>
            <section id="contact" className="py-20 bg-background-primary dark:bg-dark-background-primary">
                <ContactForm />
            </section>
        </>
    );
}
