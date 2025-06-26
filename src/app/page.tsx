// src/app/page.tsx

import { redirect } from "next/navigation";

export default function RootPage() {
	// Redirect to a default locale, for example, English.
	// You could also implement logic here to detect the user's preferred browser language
	// and redirect to that locale if it's supported.
	redirect("/en"); // Redirects to /en/ (which will then load src/app/[locale]/page.tsx for 'en')
}
