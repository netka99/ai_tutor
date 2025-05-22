"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";

export default function Home() {
	const [roles, setRoles] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [description, setDescription] = useState<string>("");
	const [userRole, setUserRole] = useState<string>("");
	const [subject, setSubject] = useState<string>("");
	const [nativeLang, setNativeLang] = useState<string>("polish");
	const [langToLearn, setLangToLearn] = useState<string>("polish");
	const [level, setLevel] = useState<string>("beginner");
	const [phrases, setPhrases] = useState<string[]>([]);
	const [chatMessages, setChatMessages] = useState<
		{ sender: string; text: string }[]
	>([]);
	const [userInput, setUserInput] = useState("");
	const sessionId = "demo-session-id"; // Later: replace with uuid or real session
	const [feedback, setFeedback] = useState<string>("");

	const tutorRole = roles.find((role) => role !== userRole) || "Tutor";
	const chatEndRef = useRef<HTMLDivElement | null>(null);
	const isFirstRender = useRef(true);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);

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

	const getDescriptionRole = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.target as HTMLFormElement);
		const subject = formData.get("subject")?.toString();
		const nativeLang = formData.get("nativeLang")?.toString();
		const langToLearn = formData.get("langToLearn")?.toString();
		const level = formData.get("level")?.toString();

		const response = await fetch("/api/subject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ subject, langToLearn, level }),
		});

		const data = await response.json();

		console.log(data);
		setDescription(data.description);
		setRoles(data.roles);
		setIsLoading(false);
	};

	const generatePhrases = async (
		role: string,
		description: string,
		langToLearn: string,
		level: string,
	) => {
		setUserRole(role);
		console.log(role);
		const response = await fetch("/api/phrases", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ role, description, langToLearn, level }),
		});
		if (!response.ok) {
			console.error("Failed to send role to backend");
			return;
		}

		const data = await response.json();
		setPhrases(data.phrases);
		console.log(data.phrases);
	};

	const sendMessageToTutor = async () => {
		if (!userInput.trim()) return;

		const newMessage = { sender: "user", text: userInput };
		setChatMessages((prev) => [...prev, newMessage]);
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
				setChatMessages((prev) => [...prev, aiMessage]);
			} else {
				console.error("API error", data);
			}
		} catch (err) {
			console.error("Failed to send message:", err);
		}
	};

	const fetchFeedback = async (sessionId: string) => {
		const res = await fetch("/api/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				sessionId,
				langToLearn,
				level,
				nativeLang,
			}),
		});

		const data = await res.json();
		console.log("Grammar feedback:", data.feedback);
		setFeedback(data.feedback);
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
					AI Language Tutor
				</h1>
				<form onSubmit={getDescriptionRole} className="mb-4">
					<div className="flex justify-between">
						<div>
							<label className="mb-2 block">Your Native Language:</label>
							<select
								name="nativeLang"
								value={nativeLang}
								onChange={(e) => setNativeLang(e.target.value)}
								className="mb-6 rounded-lg bg-white p-6 shadow-lg"
							>
								<option value="polish">Polish</option>
								<option value="english">English</option>
								<option value="italian">Italian</option>
							</select>
						</div>
						<div>
							<label className="mb-2 block">Language to learn:</label>
							<select
								name="langToLearn"
								value={langToLearn}
								onChange={(e) => setLangToLearn(e.target.value)}
								className="mb-6 rounded-lg bg-white p-6 shadow-lg"
							>
								<option value="polish">Polish</option>
								<option value="english">English</option>
								<option value="italian">Italian</option>
							</select>
						</div>
						<div>
							<label className="mb-2 block">Choose your level:</label>
							<select
								name="level"
								value={level}
								onChange={(e) => setLevel(e.target.value)}
								className="mb-6 rounded-lg bg-white p-6 shadow-lg"
							>
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="advanced">Advanced</option>
							</select>
						</div>
					</div>
					<div className="flex justify-between">
						<div>
							<label className="mb-2 block">Choose subject:</label>
							<select
								name="subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className="mb-6 rounded-lg bg-white p-6 shadow-lg"
							>
								<option value="order a meal in the restaurant">
									Order a meal in the resturant
								</option>
								<option value="open a bank account in the bank">
									Open an account in a bank
								</option>
								<option value="book an appoinment to the doctor">
									Book an appointment to the doctor
								</option>
							</select>
						</div>
						<div className="flex w-96 items-center">
							<input
								type="text"
								value=""
								// onChange={(e) => setCustomSubject(e.target.value)}
								placeholder="Add custom topic..."
								className="w-96 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
								// onKeyPress={(e) =>
								// 	e.key === "Enter" && handleCustomSubjectAdd()
								// }
							/>
						</div>
					</div>
					<button
						type="submit"
						className="rounded bg-blue-500 px-4 py-2 text-white"
						disabled={isLoading}
					>
						{isLoading ? "Generating..." : "Ask AI Tutor"}
					</button>
				</form>
				<div className="mb-6 rounded-lg bg-blue-100 px-6 py-4 text-gray-800 shadow-md">
					{description}
				</div>
				<div className="flex justify-center">
					{roles.map((role, i) => (
						<button
							key={i}
							className="mx-7 rounded-lg border border-stone-100 bg-white px-4 py-2 font-medium text-blue-700 shadow-lg hover:bg-blue-50"
							onClick={() =>
								generatePhrases(role, description, langToLearn, level)
							}
						>
							{role}
						</button>
					))}
				</div>
				<div className="m-4 mx-auto flex w-[80vh] flex-col justify-center">
					{phrases.map((phrase, i) => (
						<div
							key={i}
							className="m-2 rounded-lg border border-stone-100 bg-blue-100/50 px-4 py-2 shadow-lg hover:bg-blue-50"
						>
							{phrase}
						</div>
					))}
				</div>
				<div className="mb-20 mt-10">
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
								<strong>{msg.sender === "user" ? userRole : tutorRole}</strong>:{" "}
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
				</div>
				<div>
					<button
						onClick={() => fetchFeedback(sessionId)}
						className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Give me Feedback
					</button>
					<div>
						{feedback && (
							<div className="mt-4 rounded border bg-gray-100 p-4">
								<h2 className="mb-2 font-bold">Grammar Feedback</h2>
								<p>{feedback}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
