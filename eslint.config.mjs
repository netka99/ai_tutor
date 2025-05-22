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
			"indent": ["error", "tab"], // Enforce tab indentation
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"], // Prevent space-tab mix
		},
	}
];

export default eslintConfig;
