import { NextRequest, NextResponse } from "next/server";
import { chatWithMemory } from "@/lib/chat";

export async function POST(req: NextRequest) {
	try {
		const {
			userInput,
			sessionId,
			roles,
			userRole,
			language,
			level,
			description,
		} = await req.json();

		if (!userInput || !sessionId || !userRole || !language || !level) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}

		const { reply, sentenceCount, lastSentences } = await chatWithMemory({
			userInput,
			sessionId,
			roles,
			userRole,
			language,
			level,
			description,
		});

		return NextResponse.json({ reply, sentenceCount, lastSentences });
	} catch (err) {
		console.error("Error in /api/chat:", err);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}

export const dynamic = "force-dynamic";
