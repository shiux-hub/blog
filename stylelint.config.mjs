/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-html/vue', '@zazen/stylelint-config'],

  rules: {
    // 未知的 @ 规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'plugin',
          'apply',
          'tailwind',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'extend',
          'content',
          'use',
          'custom-variant',
          'theme',
          'utility',
        ],
      },
    ],
    'declaration-no-important': null,
  },

  ignoreFiles: ['**/*.js', '**/*.ts'],
}
