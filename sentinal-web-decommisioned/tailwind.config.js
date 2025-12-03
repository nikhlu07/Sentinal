/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                canvas: '#0A0A0A',       // Deep Carbon
                surface: '#18181B',      // Gunmetal
                primary: '#00E676',      // Radar Green
                'primary-dim': 'rgba(0, 230, 118, 0.1)',
                secondary: '#27272A',    // Stealth Grey (using secondary for borders/inactive as requested)
                hazard: '#FF5722',       // Sentinel Orange
                'ink-primary': '#F4F4F5',  // Phosphor White
                'ink-secondary': '#A1A1AA',// Camouflage
                'border-faint': '#27272A', // Stealth Grey
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'sentinel-glow': '0 0 20px rgba(0, 230, 118, 0.15)',
                'hazard-glow': '0 0 20px rgba(255, 87, 34, 0.15)',
                'monitor': '0 0 15px rgba(0, 230, 118, 0.05)',
            },
            animation: {
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scan': 'scan 4s linear infinite',
            },
            keyframes: {
                scan: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                }
            }
        },
    },
    plugins: [],
}
