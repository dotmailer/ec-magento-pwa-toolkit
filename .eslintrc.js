const config = {
    env: {
        es6: true
    },
    parser: 'babel-eslint',
    plugins: [
        'react',
        'prettier',
        'package-json',
        'react-hooks',
        'eslint-plugin-prettier'
    ],
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:package-json/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'none'
            }
        ],
        'prefer-const': 'error',
        'no-console': 'off',
        'no-unused-vars': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-uses-react': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'no-duplicate-imports': 'error',
        'one-var': ['error', 'never'],
        'no-prototype-builtins': 'off',
        'no-undef': 'off',
        'no-useless-escape': 'off',
        'react/jsx-no-literals': [
            'error',
            {
                allowedStrings: ['Submit'],
                // Use ignoreProps: false to catch label/title/alt text, etc.
                // Has the downside of erroring on "id" and other string props.
                ignoreProps: true,
                noStrings: true
            }
        ]
    },
    overrides: []
};

module.exports = config;
