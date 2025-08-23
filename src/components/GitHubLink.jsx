import { FaGithub } from "react-icons/fa6";

export default function GitHubLink({ github_url, title="GitHub Link", className="", stopPropagation=true }) {
    return (
        <a
            href={github_url}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            onClick={(e) => { if (stopPropagation) e.stopPropagation(); }}
            title={title}
        >
            <span className="relative inline-block w-5 h-5 align-middle">
                <FaGithub className="relative w-5 h-5" />
            </span>
        </a>
    );
}
