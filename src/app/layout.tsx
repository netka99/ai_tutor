import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
	title: "AI Language Tutor",
	description: "Learn languages with AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
