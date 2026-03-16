import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "eslint-plugin-next";

export default tseslint.config(
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "build",
      "dist",
      "coverage",
      ".git",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    plugins: {
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  }
);
