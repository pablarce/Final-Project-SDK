/* eslint-env node */

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
        "prettier",
        "plugin:tailwindcss/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    plugins: ["react-refresh", "tailwindcss"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "@typescript-eslint/no-non-null-assertion": "off",
        "react/jsx-key": "off",
        "tailwindcss/no-custom-classname": "off",
        "tailwindcss/classnames-order": "error",
    },
    settings: {
        tailwindcss: {
            callees: ["cn"],
            config: "tailwind.config.js",
        },
        next: {
            rootDir: true,
        },
    },
}
