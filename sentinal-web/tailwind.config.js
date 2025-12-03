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
                // The Sentinel Palette (Light Mode)
                'canvas': '#F8FAFC', // Slate 50
                'surface': '#FFFFFF', // White
                'primary': '#00E676', // Emerald 600 - Darkened for visibility on light
                'primary-dim': 'rgba(5, 150, 105, 0.1)',
                'hazard': '#DC2626', // Red 600 - Darkened for visibility
                'ink-primary': '#0F172A', // Slate 900
                'ink-secondary': '#64748B',// Slate 500
                'border-faint': '#E2E8F0', // Slate 200
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                header: ['Chakra Petch', 'sans-serif'],
            },
            boxShadow: {
                'sentinel-glow': '0 0 20px rgba(5, 150, 105, 0.25)',
                'hazard-glow': '0 0 20px rgba(220, 38, 38, 0.25)',
                'monitor': '0 0 15px rgba(5, 150, 105, 0.1)',
            },
            animation: {
                'scanline': 'scanline 2s linear infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scan': 'scan 4s linear infinite',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                },
                scan: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                }
            }
        },
    },
    plugins: [],
}
