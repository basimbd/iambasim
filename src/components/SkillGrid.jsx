import { useTranslation } from 'react-i18next';
import SkillCard from './SkillCard';

export default function SkillGrid() {
    const { t, i18n } = useTranslation('skills');

    const resources = i18n.getResourceBundle(i18n.language, 'skills');
    const skillsData = resources?.categories || {};

    const skillCategories = Object.keys(skillsData).map(key => ({
        id: key,
        ...skillsData[key]
    }));

    const getCategoryIcon = (iconPath, iconName) => {
        return <img src={iconPath} alt={`${iconName} icon`} className="w-12 h-12" />;
    };

    return (
        <section>
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold mb-8 text-text-primary dark:text-dark-text-primary">
                    {t('section_title', 'Skills')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category) => (
                        <SkillCard
                            key={category.id}
                            icon={getCategoryIcon(category.icon_path, category.name)}
                            title={category.name}
                            skills={category.skill_items.map(item => ({
                                name: item[0],
                                icon: item[1]
                            }))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
