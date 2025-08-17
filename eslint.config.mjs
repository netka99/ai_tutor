import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			indent: ["error", "tab", { "SwitchCase": 1 }], // Enforce tab indentation with proper switch case handling
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"], // Prevent space-tab mix
		},
	},
];

export default eslintConfig;
