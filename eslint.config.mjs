import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Student starter code has unused parameters until students implement it.
  {
    files: ["src/labs/day01/exercises/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "prefer-const": "off", // exercise 2a asks students to compare let and const
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
