// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    useTabs: false,
    endOfLine: 'auto',
    printWidth: '160',
    overrides: [
        {
            files: '*.json',
            options: {
                parser: 'json',
                tabWidth: 2
            }
        },
        {
            files: '*.ts',
            options: {
                parser: 'typescript'
            }
        }

    ]
};

module.exports = config;
