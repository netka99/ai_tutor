import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { RunnableSequence } from "@langchain/core/runnables";
import { AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY, // Set GOOGLE_API_KEY environment variable with your key
	model: "gemini-2.0-flash", // Or another free-tier eligible model
	temperature: 0.7,
});

type ChatInput = {
	userInput: string;
	roles: string[];
	userRole: string;
	description?: string;
	language: string;
	level: string;
};

export async function chatWithMemory({
	userInput,
	sessionId,
	roles,
	userRole,
	description,
	language,
	level,
}: {
	userInput: string;
	sessionId: string;
	roles: string[];
	userRole: string;
	description: string;
	language: string;
	level: string;
}): Promise<string> {
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

	const prompt = ChatPromptTemplate.fromTemplate(`
		You are a professional language tutor helping a student improve their ${language} skills.
		The student is at a ${level} level.
		
		The student has chosen the role "${userRole}" in the dialog. 
		The list of roles is "${roles}" and your role in this dialog is opposite to the: "${userRole}".

		Knowing the description "${description}" of dialog follow it.
		Start the conversation. Only say the first sentence and wait for the student's reply.
		
		Conversation so far:
		{history}
		
		Student says: {input}
		
		Reply in-character, using natural, realistic dialog appropriate for a ${level} level learner of ${language}.
		- Keep your reply to 1–2 concise sentences.
		- Avoid repeating previous messages.
		- Use clear and engaging language that fits the description "${description}" of the dialog .
		- Focus only on the context of the dialog—don’t over-explain.
		`);

	const chain = RunnableSequence.from([
		async (input: ChatInput) => ({
			input: input.userInput,
			history: (await memory.loadMemoryVariables({})).history,
		}),
		prompt,
		model,
	]);

	const result = await chain.invoke({
		userInput,
		roles,
		userRole,
		language,
		level,
		description,
	});

	let reply = "";
	if (typeof result === "string") {
		reply = result;
	} else if (
		result &&
		typeof result === "object" &&
		"content" in result &&
		typeof result.content === "string"
	) {
		reply = result.content;
	} else if (result instanceof AIMessage) {
		reply = result.content;
	} else {
		throw new Error("Unexpected LLM response format");
	}

	// Save to memory
	await memory.saveContext({ input: userInput }, { output: reply });

	return reply;
}

// ✅ The route handler
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

		const reply = await chatWithMemory({
			userInput,
			sessionId,
			roles,
			userRole,
			language,
			level,
			description,
		});

		return NextResponse.json({ reply });
	} catch (err) {
		console.error("Error in /api/chat:", err);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}

export const dynamic = "force-dynamic";
