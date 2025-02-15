const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        ignores: ['**/build/']
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: 'error',
            'prefer-const': 'error',
            '@typescript-eslint/no-require-imports': 'off',
            'comma-dangle': 'warn',
            'no-unused-vars': 'error',
            'require-await': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            'no-console': 'warn',
            camelcase: 'off',
            eqeqeq: 'error'
        }
    }
];
