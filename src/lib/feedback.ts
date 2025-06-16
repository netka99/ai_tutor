import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { BaseMessage } from "@langchain/core/messages";

export async function getFeedback({ sessionId }: { sessionId: string }) {
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

	const messages = history.filter(
		(msg: BaseMessage) => msg._getType?.() === "human",
	);
	const allCount = messages.length;
	const last20 = messages.slice(-20).map((msg: BaseMessage) => msg.content);

	return {
		lastSentences: last20,
		totalCount: allCount,
	};
}
