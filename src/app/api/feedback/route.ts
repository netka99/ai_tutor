import { PromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { RunnableSequence } from "@langchain/core/runnables";
import { AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { formatDocumentsAsString } from "langchain/util/document";

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY, // Set GOOGLE_API_KEY environment variable with your key
	model: "gemini-2.0-flash", // Or another free-tier eligible model
	temperature: 0.7,
});

export async function getFeedback({
	sessionId,
	langToLearn,
	level,
	nativeLang,
}: {
	sessionId: string;
	langToLearn: string;
	level: string;
	nativeLang: string;
}) {
	const upstashChatHistory = new UpstashRedisChatMessageHistory({
		sessionId,
		config: {
			url: process.env.UPSTASH_REDIS_REST_URL!,
			token: process.env.UPSTASH_REDIS_REST_TOKEN!,
		},
	});

	const memory = new BufferMemory({
		memoryKey: "history",
		chatHistory: upstashChatHistory,
		returnMessages: true,
	});

	const { history } = await memory.loadMemoryVariables({});
	console.log(history);

	const messages = history
		.filter((msg: any) => msg._getType?.() === "human")
		.map((msg: any) => msg.content);

	return messages;
}

// ✅ The route handler
export async function POST(req: NextRequest) {
	try {
		const { sessionId, langToLearn, level, nativeLang } = await req.json();

		if (!sessionId || !langToLearn || !level || !nativeLang) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}

		const humanSentences = await getFeedback({
			sessionId,
			langToLearn,
			level,
			nativeLang,
		});

		const prompt = PromptTemplate.fromTemplate(`
You are a language teacher. Check the grammar of the following learner sentences in {langToLearn} at {level} level.
You will receive a list of sentences written by the student.

1. Give feedback in {nativeLang}.
2. ONLY list the sentences that contain grammar or usage mistakes.
3. For each incorrect sentence:
   - Provide the corrected version.
   - Briefly explain what was wrong and how to fix it.
4. Do NOT include correct sentences.
5. At the end, give overall feedback on common mistakes and grammatical topics the student should focus on.

Here are the student sentences:
{sentences}
    `);

		const chain = RunnableSequence.from([prompt, model]);

		const result = await chain.invoke({
			sentences: humanSentences.join("\n"),
			langToLearn,
			level,
			nativeLang,
		});

		console.log("Grammar check input:", {
			sentences: humanSentences.join("\n"),
			langToLearn,
			level,
			nativeLang,
		});

		return NextResponse.json({ feedback: result.content });
	} catch (err) {
		console.error("Error in /api/feedback:", err);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}

// export const dynamic = "force-dynamic";
