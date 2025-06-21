import { FaGithub } from "react-icons/fa6";

export default function GitHubLink({ github_url }) {
    return (
        <a
            href={github_url}
            className="mr-4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">
            <span className="relative inline-block w-5 h-5 align-middle">
                <FaGithub className="relative w-5 h-5" />
            </span>
        </a>
    );
}
