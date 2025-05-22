import { ReactNode } from "react";
import './globals.css'

export const metadata = {
	title: 'Story Maker',
	description: 'Generate stories using AI',
}

export default function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
