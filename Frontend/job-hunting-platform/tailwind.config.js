/** @type {import('tailwindcss').Config} */
export default { content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], theme: { extend: { fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] }, colors: { ink: '#172033', brand: '#635bff', mint: '#d9f7e8' }, boxShadow: { soft: '0 12px 36px rgba(26, 37, 66, .06)' } } }, plugins: [] }
