module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
      },
      env: {
        browser: true,
        node: true,
        jest: true
      },
      globals: {
        expect: true
      },
      extends: [
        'prettier',
        'plugin:vue/recommended',        // /base, /essential, /strongly-recommended, /recommended
        'plugin:prettier/recommended',   // turns off all ESLINT rules that are unnecessary due to Prettier or might conflict with Prettier. 
        'eslint:recommended'
      ],
      plugins: ['vue', 'prettier'],
      rules: {
        'vue/max-attributes-per-line': 'off',
        'prettier/prettier': [            // customizing prettier rules (not many of them are customizable)
          'error',
          {
            singleQuote: true,
            semi: false,
            tabWidth: 2
          },
        ],
        'no-console': 'off'
      }
}
