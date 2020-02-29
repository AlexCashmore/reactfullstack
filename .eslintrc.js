module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "airbnb",
    "rules": {
        "linebreak-style": ["error", "unix"],
        "max-len": ["error", { "code": 200 }],
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/forbid-prop-types": 0,
        "keyword-spacing": ["error", {
            "overrides": {
                "if": { "after": false },
                "for": { "after": false },
                "while": { "after": false }
            }
        }],
        "spaced-comment": ["error", "always", { "block": { "balanced": false } }],
        "eol-last": ["error", "never"],
        "no-console": ["error", { "allow": ["log", "warn", "error"] }],
        "no-plusplus": 0,
        "global-require": 0,
        "no-nested-ternary": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "no-restricted-syntax": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-no-bind": 0,
        "react/no-array-index-key": 0,
        "quotes": ["error", "double"],
        "no-bitwise": 0,
        "no-return-assign": 0,
        "react/prop-types": 0,
        "react/no-danger": 0,
        "react/prefer-stateless-function": 0,
        "no-underscore-dangle": 0,
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "jsx-a11y/interactive-supports-focus": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "prefer-destructuring": 0,
    },
    "parser": "babel-eslint"
};

// node node_modules/eslint/bin/eslint.js --fix --parser babel-eslint --ext js --no-eslintrc --rule '"quotes": ["error", "double"]' ./server.js
// in case you want to apply a fix for a specific rule on a file
