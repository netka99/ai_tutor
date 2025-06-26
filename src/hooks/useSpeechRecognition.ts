import { useEffect, useRef } from "react";
import { useSpeechStore } from "@/store/speechStore";
import { useAppStore } from "@/store/useAppStore";

export function useSpeechRecognition() {
	const recognitionRef = useRef<any>(null);
	const setInputText = useSpeechStore((s) => s.setInputText);
	const setUserInput = useAppStore((s) => s.setUserInput); // 👈 sync with app input
	const { ttsLangCode } = useAppStore();

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			console.error("Browser doesn't support Speech Recognition");
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = ttsLangCode;
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			console.log("🎙️ Recognized:", transcript);
			setInputText(transcript);
			setUserInput(transcript); // 👈 update chat input box too
		};

		recognition.onerror = (event) => {
			console.error("❌ STT error", event.error);
		};

		recognitionRef.current = recognition;
	}, [setInputText, setUserInput, ttsLangCode]);

	const startListening = () => {
		recognitionRef.current?.start();
	};

	return { startListening };
}
