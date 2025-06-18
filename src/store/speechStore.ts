// store/speechStore.ts
import { create } from "zustand";

type SpeechStore = {
	inputText: string; // from STT or typed
	setInputText: (text: string) => void;

	outputText: string; // AI response to be spoken
	setOutputText: (text: string) => void;

	speak: () => void;
	speakText: (text: string) => void;
};

async function runTTS(text: string) {
	if (!text) return;

	// Wait for voices to load (max 1 second)
	const voices = await new Promise<SpeechSynthesisVoice[]>((resolve) => {
		const currentVoices = window.speechSynthesis.getVoices();
		if (currentVoices.length > 0) {
			resolve(currentVoices);
		} else {
			const timeout = setTimeout(() => resolve([]), 1000); // Fallback if voices don’t load
			window.speechSynthesis.onvoiceschanged = () => {
				clearTimeout(timeout);
				resolve(window.speechSynthesis.getVoices());
			};
		}
	});

	const voice = voices.find((v) => v.name.includes("Google US English"));

	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = "en-US";
	if (voice) utterance.voice = voice;

	utterance.onerror = (e) => {
		console.error("❌ TTS error", e.error || e.type);
	};

	// Cancel any current speech
	if (window.speechSynthesis.speaking) {
		window.speechSynthesis.cancel();

		// Short delay to allow cancel before starting again
		setTimeout(() => {
			window.speechSynthesis.speak(utterance);
		}, 100);
	} else {
		window.speechSynthesis.speak(utterance);
	}
}

export const useSpeechStore = create<SpeechStore>((set, get) => ({
	inputText: "",
	setInputText: (text) => set({ inputText: text }),

	outputText: "",
	setOutputText: (text) => set({ outputText: text }),

	speak: () => {
		const text = get().outputText;
		runTTS(text);
	},

	speakText: (text) => {
		runTTS(text);
	},
}));
