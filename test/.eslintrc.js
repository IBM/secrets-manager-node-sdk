module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: 'requiredParams' }],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['v1.ts'],
      },
    ],
  },
};
