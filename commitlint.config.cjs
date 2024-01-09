module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(commit) => commit.startsWith("chore")],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'dx'
      ],
    ],
  }
};
