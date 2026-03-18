import eslint from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        browser: 'readonly',
        document: 'readonly',
      }
    }
  },
  eslint.configs.recommended,
];
