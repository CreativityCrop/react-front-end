module.exports = {
    darkMode: 'media',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
        },
        screens: {
            'sm': {'max': '765px'},
            'md': {'min': '766px','max': '1023px'},
            'xl': '1024px'
        },
        extend: {
            colors: {
                'yankeesblue': '#1a2238',
                'jasmine': '#FFDF67',
                'maxbluepurple': '#99A9FF'
            },
            fontFamily: {
                'whiterabbit': ['White Rabbit Regular'],
                'arial': ['Arial', 'sans-serif']
              }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        // require('@tailwindcss/typography')
    ]
}