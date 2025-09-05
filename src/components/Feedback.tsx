"use client";
import React from "react";
import { useAppStore } from "../store/useAppStore";
import { useTranslations } from "next-intl";

export default function Feedback() {
	const sessionId = "demo-session-id";
	const t = useTranslations("form");

	const { level, langToLearn, nativeLang, feedback, setFeedback } =
		useAppStore();

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
		setFeedback(data.feedback);
	};

	return (
		<div>
			<div>
				{feedback.mistakes.length > 0 && (
					<div className="mt-4 rounded border bg-gray-100 p-4">
						<h2 className="mb-2 text-lg font-bold">
							{t("feedback.title")}
						</h2>

						{feedback.mistakes.length > 0 ? (
							<div>
								<h3 className="mb-2 font-semibold">
									{t("feedback.mistakes")}:
								</h3>
								<ul className="list-inside list-disc space-y-2">
									{feedback.mistakes.map((m, idx) => (
										<li key={idx}>
											<p>
												<strong>
													{t("feedback.original")}:
												</strong>{" "}
												{m.original}
											</p>
											<p>
												<strong>
													{t("feedback.correction")}:
												</strong>{" "}
												{m.correction}
											</p>
											<p>
												<strong>
													{t("feedback.explanation")}:
												</strong>{" "}
												{m.explanation}
											</p>
										</li>
									))}
								</ul>
							</div>
						) : (
							<p className="text-green-700">
								{t("feedback.noMistakes")}
							</p>
						)}

						<div className="mt-4">
							<h3 className="font-semibold">
								{t("feedback.overall")}:
							</h3>
							<p>{feedback.overallFeedback}</p>
						</div>

						<div className="mt-4">
							<h3 className="font-semibold">
								{t("feedback.topics")}:
							</h3>
							<ul className="list-inside list-disc">
								{feedback.topicsToReview.map((topic, idx) => (
									<li key={idx}>{topic}</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
			<button
				onClick={() => fetchFeedback(sessionId)}
				className="mt-3 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				{t("buttons.feedback")}
			</button>
		</div>
	);
}
