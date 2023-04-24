module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': ['error'],
    'react/default-props-match-prop-types': ['error'],
    'react-hooks/exhaustive-deps': ['off'],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'lines-between-class-members': ['error', 'always'],
    'no-warning-comments': 'warn',
    'valid-jsdoc': [
      'error',
      {
        prefer: { return: 'returns' },
        requireReturn: false, // Note: only requires if method returns something.
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: 'export' },
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'block-like', 'function', 'multiline-block-like', 'multiline-expression'],
      },
      {
        blankLine: 'always',
        prev: ['block', 'block-like', 'function', 'multiline-block-like', 'multiline-expression'],
        next: '*',
      },
    ],
    'no-console': 'warn',
    'object-curly-newline': ['error', { consistent: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
}
