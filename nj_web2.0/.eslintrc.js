module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
  parser: 'babel-eslint',
    "extends": "airbnb-base",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
      'import/extensions': ['error', 'always', {
        'js': 'never',
        'vue': 'never'
      }],
      'import/no-extraneous-dependencies': ['error', {
        'optionalDependencies': ['test/unit/index.js']
      }],
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-param-reassign":0,
        "arrow-body-style":0,
        "no-plusplus":0,
        "no-lonely-if":0,
        "no-undef":0,
        "object-shorthand ":0,
        "default-case":0,
        "prefer-template":0,
        "object-shorthand":0,
        "no-mixed-operators":0,
        "max-len":0,
        "no-restricted-syntax":0,
        "guard-for-in":0,
        "dot-notation":0,
        "no-underscore-dangle":0,
        'import/no-unresolved': 0,
      "no-unused-vars":0,
      "arrow-parens": 0,
      "prefer-const":0,
	  "no-mixed-spaces-and-tabs":0,
	  "no-nested-ternary":0,
      "no-await-in-loop":0,
	   "no-tabs":0,
        "semi": [
            "error",
            "never"
        ],
        // 标签未正确关闭不提醒
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
    }
};
