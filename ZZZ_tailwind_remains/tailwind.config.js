/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./resources/**/*.{html,php,js,jsx}"
    ],
    theme:
        require( './resources/js/theme.js' )
    ,
    plugins: [
        require('flowbite/plugin')
    ],
    safelist: [
        'bg-info', 'bg-success', 'bg-error', 'bg-warning',
        'text-info', 'text-success', 'text-error', 'text-warning'
    ]
}
