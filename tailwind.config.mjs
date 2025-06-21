import plugin from 'tailwindcss/plugin';

export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,js,jsx,ts,tsx,md,mdx}', './public/**/*.html'],
    theme: {
        extend: {
            colors: {
                // Light theme colors
                primary: {
                    DEFAULT: '#1E5B7F', // Professional deep blue
                    light: '#2D7BA7',
                    dark: '#0F3E58'
                },
                secondary: {
                    DEFAULT: '#475569', // Slate gray
                    light: '#94A3B8',
                    dark: '#334155'
                },
                accent: {
                    DEFAULT: '#9F6B3F', // Sophisticated amber
                    light: '#BE8C64',
                    dark: '#7D4E26'
                },
                background: {
                    primary: '#F0F7FF',
                    secondary: '#E6F0FA',
                    card: '#DCE9F6'
                },
                text: {
                    primary: '#0F172A',
                    secondary: '#475569',
                    muted: '#94A3B8'
                },

                // Dark theme colors
                dark: {
                    primary: {
                        DEFAULT: '#3987AD', // Lighter blue for dark mode
                        light: '#5AA6CA',
                        dark: '#1E5B7F'
                    },
                    secondary: {
                        DEFAULT: '#94A3B8', // Slate
                        light: '#CBD5E1',
                        dark: '#64748B'
                    },
                    accent: {
                        DEFAULT: '#C08B59', // Warmer amber for dark mode
                        light: '#DEB38A',
                        dark: '#9F6B3F'
                    },
                    background: {
                        primary: '#0F172A',
                        secondary: '#0A1022',
                        card: '#1E293B'
                    },
                    text: {
                        primary: '#F8FAFC',
                        secondary: '#E2E8F0',
                        muted: '#94A3B8'
                    }
                }
            }
        }
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            function hexToRgb(hex) {
                const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result
                    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
                    : null;
            }

            // Export color variables to CSS
            addBase({
                ':root': {
                    // Light theme
                    '--tw-color-primary': theme('colors.primary.DEFAULT'),
                    '--tw-color-primary-light': theme('colors.primary.light'),
                    '--tw-color-primary-dark': theme('colors.primary.dark'),
                    '--tw-color-secondary': theme('colors.secondary.DEFAULT'),
                    '--tw-color-secondary-light': theme('colors.secondary.light'),
                    '--tw-color-secondary-dark': theme('colors.secondary.dark'),
                    '--tw-color-accent': theme('colors.accent.DEFAULT'),
                    '--tw-color-accent-light': theme('colors.accent.light'),
                    '--tw-color-accent-dark': theme('colors.accent.dark'),
                    '--tw-color-background-primary': theme('colors.background.primary'),
                    '--tw-color-background-secondary': theme('colors.background.secondary'),
                    '--tw-color-background-card': theme('colors.background.card'),
                    '--tw-color-text-primary': theme('colors.text.primary'),
                    '--tw-color-text-secondary': theme('colors.text.secondary'),
                    '--tw-color-text-muted': theme('colors.text.muted'),

                    // RGB versions for opacity manipulation
                    '--tw-color-primary-rgb': hexToRgb(theme('colors.primary.DEFAULT')),
                    '--tw-color-secondary-rgb': hexToRgb(theme('colors.secondary.DEFAULT')),
                    '--tw-color-accent-rgb': hexToRgb(theme('colors.accent.DEFAULT')),
                    '--tw-color-background-primary-rgb': hexToRgb(theme('colors.background.primary')),
                    '--tw-color-background-secondary-rgb': hexToRgb(theme('colors.background.secondary')),
                },
                '.dark': {
                    // Dark theme
                    '--tw-color-dark-primary': theme('colors.dark.primary.DEFAULT'),
                    '--tw-color-dark-primary-light': theme('colors.dark.primary.light'),
                    '--tw-color-dark-primary-dark': theme('colors.dark.primary.dark'),
                    '--tw-color-dark-secondary': theme('colors.dark.secondary.DEFAULT'),
                    '--tw-color-dark-secondary-light': theme('colors.dark.secondary.light'),
                    '--tw-color-dark-secondary-dark': theme('colors.dark.secondary.dark'),
                    '--tw-color-dark-accent': theme('colors.dark.accent.DEFAULT'),
                    '--tw-color-dark-accent-light': theme('colors.dark.accent.light'),
                    '--tw-color-dark-accent-dark': theme('colors.dark.accent.dark'),
                    '--tw-color-dark-background-primary': theme('colors.dark.background.primary'),
                    '--tw-color-dark-background-secondary': theme('colors.dark.background.secondary'),
                    '--tw-color-dark-background-card': theme('colors.dark.background.card'),
                    '--tw-color-dark-text-primary': theme('colors.dark.text.primary'),
                    '--tw-color-dark-text-secondary': theme('colors.dark.text.secondary'),
                    '--tw-color-dark-text-muted': theme('colors.dark.text.muted'),

                    // RGB versions for opacity manipulation
                    '--tw-color-dark-primary-rgb': hexToRgb(theme('colors.dark.primary.DEFAULT')),
                    '--tw-color-dark-secondary-rgb': hexToRgb(theme('colors.dark.secondary.DEFAULT')),
                    '--tw-color-dark-accent-rgb': hexToRgb(theme('colors.dark.accent.DEFAULT')),
                    '--tw-color-dark-background-primary-rgb': hexToRgb(theme('colors.dark.background.primary')),
                    '--tw-color-dark-background-secondary-rgb': hexToRgb(theme('colors.dark.background.secondary')),
                }
            });
        })
    ]
};
