module.exports = {
    content: [
         "./src/**/*.{html,ts}",
    ],
    safelist: [
        'tw-bg-blue-800/75',
        {
            pattern: /(bg|text)-(blue)-(800)/,
            variants: ['hover'],
        },
    ],
    prefix: 'tw-',
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
}
