// @ts-check
import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  rules: {
    // use semicolons
    'style/semi': ['error', 'always'],
    // ignore quotes
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],

    'prefer-arrow-callback': 'off',
    'regexp/no-useless-escape': 'off',
    'no-useless-return': ['warn'],
    'unused-imports/no-unused-vars': ['error', {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
      caughtErrors: 'none',
    }],
    'no-unused-vars': 'off',
    'ts/consistent-type-definitions': 'off',
  },
});
