"use client";
import React from "react";
// import { useRef } from "react";
import { useAppStore } from "../store/useAppStore";
import "./globals.css";

import MainSelectors from "../components/MainSelectors";
import DescriptionPhrases from "../components/DescriptionPhrases";
import ChatInterface from "../components/ChatInterface";

export default function Home() {
	const {
		// subject,
		nativeLang,
		langToLearn,
		level,
		sentenceCount,
		feedback,
		setFeedback,
		setSentenceCount,
	} = useAppStore();
	const sessionId = "demo-session-id"; // Later: replace with uuid or real session

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
		setSentenceCount(data.sentenceCount);
	};

	return (
		<main className="mb-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
					AI Language Tutor
				</h1>
				<MainSelectors />
				<DescriptionPhrases />
				<ChatInterface />
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
								<h2 className="mb-2 text-lg font-bold">Grammar Feedback</h2>

								{feedback.mistakes.length > 0 ? (
									<div>
										<h3 className="mb-2 font-semibold">Mistakes:</h3>
										<ul className="list-inside list-disc space-y-2">
											{feedback.mistakes.map((m, idx) => (
												<li key={idx}>
													<p>
														<strong>Original:</strong> {m.original}
													</p>
													<p>
														<strong>Correction:</strong> {m.correction}
													</p>
													<p>
														<strong>Explanation:</strong> {m.explanation}
													</p>
												</li>
											))}
										</ul>
									</div>
								) : (
									<p className="text-green-700">
										No mistakes found. Well done!
									</p>
								)}

								<div className="mt-4">
									<h3 className="font-semibold">Overall Feedback:</h3>
									<p>{feedback.overallFeedback}</p>
								</div>

								<div className="mt-4">
									<h3 className="font-semibold">Topics to Review:</h3>
									<ul className="list-inside list-disc">
										{feedback.topicsToReview.map((topic, idx) => (
											<li key={idx}>{topic}</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
				<div>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 rounded bg-red-400 px-4 py-2 text-white hover:bg-red-700"
					>
						Start New Chat
					</button>
				</div>
			</div>
		</main>
	);
}
