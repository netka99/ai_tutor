import { PromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { RunnableSequence } from "@langchain/core/runnables";
import { AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { formatDocumentsAsString } from "langchain/util/document";
import { JsonOutputParser } from "@langchain/core/output_parsers";

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

	const messages = history.filter((msg: any) => msg._getType?.() === "human");
	const allCount = messages.length;
	const last20 = messages.slice(-20).map((msg: any) => msg.content);

	return {
		lastSentences: last20,
		totalCount: allCount,
	};
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

		const { lastSentences, totalCount } = await getFeedback({
			sessionId,
			langToLearn,
			level,
			nativeLang,
		});

		const prompt = PromptTemplate.fromTemplate(`
  You are a language teacher. The student is learning {langToLearn} at {level} level.

  Provide feedback in {nativeLang}.
  Check the grammar of the following sentences. 
  Only return those that are incorrect and for each, provide:
  - the original sentence,
  - the corrected sentence,
  - a short explanation of the mistake.

  At the end, give:
  - general feedback (overall impression),
  - suggested grammar topics to review.

  Respond strictly in the following JSON format:

  {{
    "mistakes": [
      {{
        "original": "...",
        "correction": "...",
        "explanation": "..."
      }}
    ],
    "overallFeedback": "...",
    "topicsToReview": ["...", "..."]
  }}

  Sentences:
  {sentences}
`);

		const parser = new JsonOutputParser();
		const chain = RunnableSequence.from([prompt, model, parser]);

		const result = await chain.invoke({
			sentences: lastSentences.join("\n"),
			langToLearn,
			level,
			nativeLang,
		});

		return NextResponse.json({
			feedback: result,
			sentenceCount: totalCount,
		});
	} catch (err) {
		console.error("Error in /api/feedback:", err);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}

// export const dynamic = "force-dynamic";
