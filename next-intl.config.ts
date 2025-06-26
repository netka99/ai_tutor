// D:\Work\AI_tutor_test_Langchain\ai_tutor\next-intl.config.ts

import { getRequestConfig } from "next-intl/server";
import path from "path"; // Make sure this import is present!

const locales = ["en", "pl", "it", "fr", "de"]; // Keep in sync with src/app/[locale]/layout.tsx

export default getRequestConfig(async ({ locale }) => {
	// This check is good, ensures you don't try to load invalid locales
	if (!locales.includes(locale)) {
		throw new Error(`Unsupported locale: ${locale}`);
	}

	return {
		locale: locale, // Important for the type check and internal use
		messages: (
			await import(
				path.join(process.cwd(), "src", "messages", `${locale}.json`)
			)
		).default,
		// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
		// This line is THE most critical for the 'config file not found' error.
		// It forms the absolute path: D:\Work\AI_tutor_test_Langchain\ai_tutor\src\messages\en.json (for locale 'en')
	};
});
