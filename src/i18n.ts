// D:\Work\AI_tutor_test_Langchain\ai_tutor\src\i18n.ts

import { getRequestConfig } from "next-intl/server";

const locales = ["en", "pl", "it", "fr", "de"];

export default getRequestConfig(async ({ locale }) => {
	if (!locale || !locales.includes(locale)) {
		return {
			locale: "en",
			messages: (await import(`./messages/en.json`)).default,
		};
	}

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});
