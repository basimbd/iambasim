export default function SkillCard({ icon, title, skills }) {
    return (
        <div className="bg-background-card dark:bg-dark-background-card rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
                {icon &&
                    <div className="text-primary dark:text-dark-primary mr-3 inset-shadow-lg">
                        {icon}
                    </div>}
                <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-primary-light/20 dark:bg-dark-primary-light/20 text-primary-dark dark:text-dark-primary-light text-sm rounded-full"
                    >
                        {skill.icon && (
                            <img
                                src={skill.icon}
                                alt={`${skill.name} icon`}
                                className="w-4 h-4 mr-1"
                            />
                        )}
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
