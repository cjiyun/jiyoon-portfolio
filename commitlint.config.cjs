module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['pascal-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'comment',
        'remove',
        'rename',
        'build',
        'ci',
      ],
    ],
  },
};
