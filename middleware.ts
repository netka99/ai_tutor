// D:\Work\AI_tutor_test_Langchain\ai_tutor\middleware.ts

import type { NextRequest } from "next/server"; // It's good practice to import NextRequest type
import createMiddleware from "next-intl/middleware";

// Instead of `export default createMiddleware(...)`,
// you export a named function `middleware`
export function middleware(request: NextRequest) {
	// Call the createMiddleware function and then immediately invoke its result
	// with the incoming request.
	return createMiddleware({
		locales: ["en", "pl", "it", "fr", "de"],
		defaultLocale: "en",
		localePrefix: "always",
	})(request);
}

export const config = {
	// This matcher needs to be outside the middleware function
	matcher: ["/(en|pl|it|fr|de)/:path*"],
};
