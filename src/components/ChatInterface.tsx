"use client";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useAppStore } from "../store/useAppStore";

export default function ChatInterface() {
	const {
		level,
		langToLearn,
		userRole,
		roles,
		userInput,
		chatMessages,
		addChatMessage,
		setUserInput,
		description,
		aiRole,
		setSentenceCount,
		sentenceCount,
	} = useAppStore();

	const chatEndRef = useRef<HTMLDivElement | null>(null);
	const isFirstRender = useRef(true);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);
	const sessionId = "demo-session-id";

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const container = chatContainerRef.current;

		if (!container || !chatEndRef.current) return;

		const scrollThreshold = 100;
		const distanceFromBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight;
		if (distanceFromBottom < scrollThreshold) {
			chatEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatMessages]);

	const sendMessageToTutor = async () => {
		if (!userInput.trim()) return;

		const newMessage = { sender: "user", text: userInput };
		addChatMessage(newMessage);
		setUserInput("");

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userInput,
					sessionId,
					roles,
					userRole,
					description,
					language: langToLearn,
					level,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				const aiMessage = { sender: "tutor", text: data.reply };
				addChatMessage(aiMessage);
				setSentenceCount(data.sentenceCount);
			} else {
				console.error("API error", data);
			}
		} catch (err) {
			console.error("Failed to send message:", err);
		}
	};

	return (
		<div className="mb-10 mt-10">
			<h2 className="mb-2 text-xl font-semibold">Chat</h2>
			<div
				ref={chatContainerRef}
				className="mb-4 h-64 overflow-y-auto rounded-lg bg-gray-100 p-4 shadow-inner"
			>
				{chatMessages.map((msg, i) => (
					<div
						key={i}
						className={`mb-2 ${
							msg.sender === "user"
								? "text-right text-blue-800"
								: "text-left text-green-800"
						}`}
					>
						<strong>{msg.sender === "user" ? userRole : aiRole}</strong>:{" "}
						{msg.text}
					</div>
				))}
				<div ref={chatEndRef} />
			</div>
			<div className="flex gap-2">
				<input
					type="text"
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					placeholder="Type your message..."
					className="flex-1 rounded border p-2"
				/>
				<button
					onClick={sendMessageToTutor}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Send
				</button>
			</div>
			{sentenceCount >= 20 ? (
				<div className="mt-2 rounded bg-yellow-100 p-2 text-sm text-yellow-800">
					You&apos;ve written {sentenceCount} sentences. You can now request
					feedback!
				</div>
			) : (
				<div className="mb-4 rounded bg-green-100 p-2 text-sm text-yellow-800">
					Counter of your sentences: {sentenceCount}
				</div>
			)}
		</div>
	);
}
