import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";

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
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // ✅ ADD THIS (IMPORTANT)
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },

rules: {
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "@next/next/no-img-element": "off",
  "react-hooks/exhaustive-deps": "off",
  "@typescript-eslint/triple-slash-reference": "off",
},
  }
);