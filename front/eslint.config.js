import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  {
    ignores: ["dist"], // Ignorar la carpeta `dist`
  },
  {
    extends: [js.configs.recommended], // Configuración recomendada para JavaScript
    files: ["**/*.{ts,tsx}"], // Aplica a archivos TypeScript y TSX
    languageOptions: {
      ecmaVersion: 2020, // Especifica la versión de ECMAScript
      globals: globals.browser, // Usa variables globales del entorno navegador
    },
    plugins: {
      "react-hooks": reactHooks, // Configuración para React Hooks
      "react-refresh": reactRefresh, // Configuración para React Refresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Reglas recomendadas de React Hooks
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Configuración para React Refresh
      ],
    },
  },
];
