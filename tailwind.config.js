module.exports = {
    darkMode: 'media',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        screens: {
            'sm': {'max': '765px'},
            'md': {'min': '766px','max': '1023px'},
            'xl': '1024px'
        },
        extend: {
            colors: {
                'yankeesblue': '#1a2238',
                'jasmine': '#f4db7d',
                'maxbluepurple': '#9daaf2'
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
}