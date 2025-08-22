import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function CollapsibleText({ text, lines = 5, className = '' }) {

    const descRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);

    const measure = () => {
        const element = descRef.current;
        if (!element) return false;

        element.style.setProperty('--clamp', String(lines));
        const had = element.classList.contains('clamp-collapsed');
        element.classList.add('clamp-collapsed');

        const overflow = element.scrollHeight > element.clientHeight + 1;
        if (!had) element.classList.remove('clamp-collapsed');

        setHasOverflow(overflow);
    };

    useIsoLayoutEffect(() => {
        measure();

        // Re-measure after fonts load or a resize (font metrics can change height)
        if (typeof document !== 'undefined' && 'fonts' in document)
            document.fonts?.ready?.then(measure).catch(() => { });

        // Re-measure on width changes (responsive)
        const resObs = new ResizeObserver(measure);
        if (descRef.current)
            resObs.observe(descRef.current);
        return () => resObs.disconnect();
    }, [text, lines]);

    useEffect(() => {
        if (!expanded && descRef.current) descRef.current.scrollTop = 0;
    }, [expanded]);

    return (
        <div className={`${className}`} style={{
                lineHeight: '1.5rem',              // ~24px per line
                height: `calc(${lines} * 1.5rem)`, // fixed height section
            }}
        >
            <p className="h-full text-text-secondary dark:text-dark-text-secondary overflow-hidden">
                <span ref={descRef} className={
                    expanded ? 'h-full overflow-y-auto block'
                    : 'h-full clamp-collapsed' }
                    style={{
                        ['--clamp']: String(lines),
                        display: expanded ? 'block' : undefined,
                    }}
                >{text}</span>
            </p>

            {hasOverflow && (
                <button tabIndex={0}
                    onClick={(e) => {e.stopPropagation(); setExpanded(v => !v) }}
                    className="cursor-pointer text-sm text-primary dark:text-dark-primary
                    hover:underline mb-2"
                >{expanded ? '…See Less' : 'See More…'}</button>
            )}
        </div>
    );
}
