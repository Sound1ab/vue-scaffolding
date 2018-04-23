module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: ['prettier', 'prettier/standard', 'plugin:vue/recommended'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 8,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: ['vue', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'ignore'
            }
        ],
        'no-tabs': ['error']
    },
    globals: {
        expect: true,
        sinon: true,
        describe: true,
        it: true
    }
};
