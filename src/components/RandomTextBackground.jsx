import React, { useState, useEffect, useRef } from 'react';

export default function RandomTextBackground() {
    const [elements, setElements] = useState([]);
    const elementCountRef = useRef(0);
    const MAX_ELEMENTS = 6;

    useEffect(() => {
        // Code snippets with syntax highlighting
        const codeSnippets = [
            <>
                <span className="text-blue-600 dark:text-blue-400">function</span> <span className="text-green-600 dark:text-green-400">fibonacci</span><span className="text-gray-600 dark:text-gray-400">(</span><span className="text-amber-600 dark:text-amber-400">n</span><span className="text-gray-600 dark:text-gray-400">)</span>
            </>,
            <>
                <span className="text-amber-600 dark:text-amber-400">@Transactional</span>
            </>,
            <>
                <span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-amber-600 dark:text-amber-400">data</span> <span className="text-blue-600 dark:text-blue-400">=</span> <span className="text-green-600 dark:text-green-400">await</span> <span className="text-amber-600 dark:text-amber-400">fetch</span><span className="text-gray-600 dark:text-gray-400">()</span>
            </>,
            <>
                <span className="text-blue-600 dark:text-blue-400">if</span><span className="text-gray-600 dark:text-gray-400">(</span><span className="text-amber-600 dark:text-amber-400">x</span> <span className="text-blue-600 dark:text-blue-400">===</span> <span className="text-green-600 dark:text-green-400">true</span><span className="text-gray-600 dark:text-gray-400">)</span>
            </>,
            <>
                <span className="text-purple-600 dark:text-purple-400">import</span> <span className="text-slate-600 dark:text-slate-400">numpy</span> <span className="text-purple-600 dark:text-purple-400">as</span> <span className="text-slate-600 dark:text-slate-400">np</span>
            </>,
            <>
                <span className="text-purple-600 dark:text-purple-400">print</span><span className="text-gray-600 dark:text-gray-400">(</span><span className="text-green-600 dark:text-green-400">"Hello World!"</span><span className="text-gray-600 dark:text-gray-400">)</span>
            </>,
            <>
                <span className="text-blue-600 dark:text-blue-400">SpringApplication</span><span className="text-gray-600 dark:text-gray-400">.</span><span className="text-green-600 dark:text-green-400">run</span><span className="text-gray-600 dark:text-gray-400">(</span><span className="text-amber-600 dark:text-amber-400">Application</span><span className="text-gray-600 dark:text-gray-400">.</span><span className="text-blue-600 dark:text-blue-400">class</span><span className="text-gray-600 dark:text-gray-400">,</span> <span className="text-amber-600 dark:text-amber-400">args</span><span className="text-gray-600 dark:text-gray-400">);</span>
            </>,
            <>
                <span className="text-slate-600 dark:text-slate-400">torch</span><span className="text-gray-600 dark:text-gray-400">.</span><span className="text-slate-600 dark:text-slate-400">cuda</span><span className="text-gray-600 dark:text-gray-400">.</span><span className="text-amber-600 dark:text-amber-400">is_available</span><span className="text-gray-600 dark:text-gray-400">()</span>
            </>,
            <>
                <span className="text-green-600 dark:text-green-400">sudo</span> <span className="text-red-600 dark:text-red-400">rm</span> <span className="text-blue-600 dark:text-blue-400">-rf</span> <span className="text-amber-600 dark:text-amber-400">~/*</span>
            </>,
            <>
                <span className="text-purple-600 dark:text-purple-400">SELECT</span> <span className="text-amber-600 dark:text-amber-400">*</span> <span className="text-purple-600 dark:text-purple-400">FROM</span> <span className="text-blue-600 dark:text-blue-400">users</span>
            </>
        ];

        const createElement = (isInitialLoad = false) => {
            const elementWidth = 30;
            const elementHeight = 10;

            const occupiedAreas = elements.map(el => {
                const style = el.style;
                return {
                    top: parseFloat(style.top),
                    left: parseFloat(style.left),
                    width: elementWidth,
                    height: elementHeight
                };
            });

            // Generate positions away from the center
            // and no overlap with existing elements
            const getRandomPosition = () => {
                // Define center area to avoid
                // middle 60% (shifted 5% to left) horizontally,
                // middle 70% vertically
                const centerXStart = 15;
                const centerXEnd = 75;
                const centerYStart = 15;
                const centerYEnd = 85;

                const maxAttempts = 25;
                let attempts = 0;
                let top, left;
                let overlapping = true;

                while (overlapping && attempts < maxAttempts) {
                    attempts++;

                    top = Math.floor(Math.random() * 90) + 5;
                    left = Math.floor(Math.random() * 90) + 5;

                    // Skip if in center area
                    if (left > centerXStart && left < centerXEnd &&
                        top > centerYStart && top < centerYEnd) {
                        continue;
                    }

                    // Check for overlap with existing elements
                    overlapping = occupiedAreas.some(area => {
                        const padding = 5;

                        return !(
                            left + elementWidth + padding < area.left ||
                            left > area.left + area.width + padding ||
                            top + elementHeight + padding < area.top ||
                            top > area.top + area.height + padding
                        );
                    });
                }

                return overlapping ? { top: -100, left: -100 } : { top, left };
            };

            const getUniqueSnippetIndex = () => {
                const usedIndices = elements.map(el => el.snippetIndex);

                const availableIndices = Array.from(
                    { length: codeSnippets.length },
                    (_, i) => i
                ).filter(i => !usedIndices.includes(i));

                if (availableIndices.length > 0) {
                    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
                }
                return Math.floor(Math.random() * codeSnippets.length);
            };

            const snippetIndex = getUniqueSnippetIndex();
            const codeSnippet = codeSnippets[snippetIndex];

            const { top, left } = getRandomPosition();

            if (top < 0) return null;

            const contentLength = React.Children.count(codeSnippet.props.children) * 2;
            // const rotation = Math.floor(Math.random() * 32) - 16;
            const rotation = 0;
            const animationDuration = 4 + (contentLength * 0.2) + (Math.random() * 3);
            const animationDelay = isInitialLoad ? Math.random() * 3 : 0;

            return {
                id: `code-${Date.now()}-${elementCountRef.current++}`,
                content: codeSnippet,
                snippetIndex: snippetIndex,
                style: {
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: `rotate(${rotation}deg)`,
                    animationDuration: `${animationDuration}s`,
                    animationDelay: `${animationDelay}s`
                }
            };
        };

        const handleAnimationEnd = (id) => {
            setElements(prevElements => {
                const index = prevElements.findIndex(el => el.id === id);
                if (index === -1) return prevElements;

                // Create new element to replace the finished one
                const newElement = createElement();
                if (!newElement) {
                    // If no valid position found, just remove the element
                    return prevElements.filter((_, i) => i !== index);
                }

                // Replace the finished element with the new one
                const newElements = [...prevElements];
                newElements[index] = newElement;
                return newElements;
            });
        };

        const initialElements = [];
        for (let i = 0; i < MAX_ELEMENTS; i++) {
            const element = createElement(true);
            if (element) initialElements.push(element);
        }
        setElements(initialElements);

        const animationEndListener = (e) => {
            const id = e.target.id;
            if (id && e.animationName === 'text-reveal') {
                handleAnimationEnd(id);
            }
        };

        document.addEventListener('animationend', animationEndListener);

        return () => {
            // Clean up listener when component unmounts
            document.removeEventListener('animationend', animationEndListener);
        };
    }, []);

    useEffect(() => {
        // Only run if we have fewer elements than the maximum
        if (elements.length < MAX_ELEMENTS) {
            const elementsToAdd = MAX_ELEMENTS - elements.length;

            const timer = setTimeout(() => {
                const newElements = [];

                for (let i = 0; i < elementsToAdd; i++) {
                    const element = createElement();
                    if (element) newElements.push(element);
                }

                if (newElements.length > 0) {
                    setElements(prevElements => [...prevElements, ...newElements]);
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [elements.length]); // Dependency on elements.length

    return (
        <>
            {elements.map(element => (
                <div
                    key={element.id}
                    id={element.id}
                    className={`absolute invisible sm:visible ${element.type === 'binary' ? 'binary-text' : 'code-text'}`}
                    style={element.style}
                >
                    {element.content}
                </div>
            ))}
        </>
    );
};
