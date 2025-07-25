import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default [
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	),
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				React: "writable",
				JSX: "readonly",
			},
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/prop-types": "off",
			"no-console": "warn",
			"react/display-name": "off",
			"react/react-in-jsx-scope": "off",

			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",

			"simple-import-sort/imports": "warn",
			"simple-import-sort/exports": "warn",
			"unused-imports/no-unused-imports": "warn",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		ignores: [
			"**/.lintstagedrc.js",
			"**/eslint.config.mjs",
			"**/.prettierrc.js",
			"**/tailwind.config.js",
			"**/node_modules/",
			"**/dist/",
			"**/vite.config.js",
		],
	},
];
