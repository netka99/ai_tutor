"use client";
import React from "react";

import MainSelectors from "../../components/MainSelectors";
import DescriptionPhrases from "../../components/DescriptionPhrases";
import ChatInterface from "../../components/ChatInterface";
import Feedback from "../../components/Feedback";
import { useTranslations } from "next-intl";

// import AudioRecorder from "../../components/AudioRecorder";

export default function Home() {
	const t = useTranslations("form");

	return (
		<main className="mb-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
					AI Language Tutor
				</h1>
				<MainSelectors />
				<DescriptionPhrases />
				<ChatInterface />
				<Feedback />
				{/* <AudioRecorder /> */}
				<div>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 rounded bg-red-400 px-4 py-2 text-white hover:bg-red-700"
					>
						{t("buttons.newChat")}
					</button>
				</div>
			</div>
		</main>
	);
}
