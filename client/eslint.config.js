import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const browserGlobals = {
  console: "readonly",
  document: "readonly",
  fetch: "readonly",
  localStorage: "readonly",
  navigator: "readonly",
  setTimeout: "readonly",
  URLSearchParams: "readonly",
  window: "readonly"
};

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: browserGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: "module"
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
];
