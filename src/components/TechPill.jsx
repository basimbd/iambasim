// Map of tech names to their logo paths
const techLogoMap = {
    'Java': '/icons/tech/java.svg',
    'SpringBoot': '/icons/tech/spring-boot.svg',
    'PostgreSQL': '/icons/tech/postgresql.svg',
    'Gradle': '/icons/tech/gradle.svg',
    'Jenkins': '/icons/tech/jenkins.svg',
    'GitHub Actions': '/icons/tech/github-actions.svg',
    'Google Analytics': '/icons/tech/google-analytics.svg',
    'Python': '/icons/tech/python.svg',
    'TypeScript': '/icons/tech/typescript.svg',
    'Next.js': '/icons/tech/nextjs.svg',
    'Docker': '/icons/tech/docker.svg',
    'React': '/icons/tech/react.svg',
    'Node.js': '/icons/tech/nodejs.svg',
    'MongoDB': '/icons/tech/mongodb.svg',
    'Redis': '/icons/tech/redis.svg',
    'AWS': '/icons/tech/aws.svg',
    'Git': '/icons/tech/git.svg',
    'PMD': '/icons/tech/pmd.svg',
    'SpotBugs': '/icons/tech/spotbugs.png',
    'Transformers': '/icons/tech/transformers.svg',
    'HuggingFace': '/icons/tech/huggingface.svg'
};

export const TextPill = ({ tech }) => {
    return (
        <span className="inline-block bg-primary-light/20 text-primary-dark dark:bg-dark-primary-light/20 dark:text-dark-primary-light text-xs px-3 py-1 rounded-full mr-2 mb-2">
            {tech}
        </span>
    );
};

export const LogoPill = ({ tech }) => {
    const logoPath = techLogoMap[tech] || '/icons/tech/code.png'; // Fallback to generic icon

    return (
        <span className="inline-flex items-center bg-primary-light/20 text-primary-dark dark:bg-dark-primary-light/20 dark:text-dark-primary-light text-xs px-3 py-1 rounded-full mr-2 mb-2">
            <img
                src={logoPath}
                alt={`${tech} logo`}
                className="w-4 h-4 mr-1"
                onError={(e) => { e.target.style.display = 'none' }}
            />
            {tech}
        </span>
    );
};
