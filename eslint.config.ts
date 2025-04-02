import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'node_modules',
    '**/node_modules/**',
    'dist',
    '**/dist/**',
    '.vitepress/dist',
    '.vitepress/dist/**',
    '.cache',
    '**/.cache/**',
    'auto-imports.d.ts',
    '**/auto-imports.d.ts/**',
    'components.d.ts',
    '**/components.d.ts/**',
  ],
  vue: true,
  javascript: {
    overrides: {
      'no-console': 'off',
    },
  },
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
})
