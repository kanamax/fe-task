module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'prettier'
  ],
  rules: {
    indent: ['error', 2],
    'object-curly-spacing': ["error", "always"],
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { code: 120 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [ 0, { ignorePureComponents: true }],
    "react/forbid-prop-types": [ 0, {
      forbid: ['object'],
      checkContextTypes: false, 
      checkChildContextTypes: false
    }]
  }
};
