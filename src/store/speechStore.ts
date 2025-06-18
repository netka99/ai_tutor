// store/speechStore.ts
import { create } from "zustand";

type SpeechStore = {
	inputText: string; // from STT or typed
	setInputText: (text: string) => void;

	outputText: string; // AI response to be spoken
	setOutputText: (text: string) => void;

	speak: () => void;
};

export const useSpeechStore = create<SpeechStore>((set, get) => ({
	inputText: "",
	setInputText: (text) => set({ inputText: text }),

	outputText: "",
	setOutputText: (text) => set({ outputText: text }),

	speak: () => {
		const text = get().outputText;
		if (!text) return;

		const speakNow = () => {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = "en-US";

			const voices = window.speechSynthesis.getVoices();
			const voice = voices.find((v) => v.name.includes("Google US English"));
			if (voice) utterance.voice = voice;

			utterance.onerror = (e) => {
				console.error("❌ TTS error", e.error || e.type);
			};

			window.speechSynthesis.speak(utterance);
		};

		if (window.speechSynthesis.speaking) {
			window.speechSynthesis.cancel();

			// Delay to prevent race condition
			setTimeout(() => {
				// Voices may still be loading
				if (window.speechSynthesis.getVoices().length === 0) {
					window.speechSynthesis.onvoiceschanged = speakNow;
				} else {
					speakNow();
				}
			}, 100); // 100ms delay works well in most browsers
		} else {
			// Same logic if nothing is speaking
			if (window.speechSynthesis.getVoices().length === 0) {
				window.speechSynthesis.onvoiceschanged = speakNow;
			} else {
				speakNow();
			}
		}
	},
}));
