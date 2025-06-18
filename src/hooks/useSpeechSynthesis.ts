// // hooks/useSpeechSynthesis.ts
// import { useEffect, useRef } from "react";

// export function useSpeechSynthesis() {
// 	const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

// 	useEffect(() => {
// 		const loadVoices = () => {
// 			const voices = window.speechSynthesis.getVoices();
// 			voicesRef.current = voices;
// 		};
// 		loadVoices();

// 		if (typeof window !== "undefined" && window.speechSynthesis) {
// 			window.speechSynthesis.onvoiceschanged = loadVoices;
// 		}
// 	}, []);

// 	const unlockAudio = () => {
// 		const dummy = new SpeechSynthesisUtterance(" ");
// 		dummy.volume = 0;
// 		dummy.rate = 10;
// 		window.speechSynthesis.speak(dummy);
// 	};

// 	const speak = (text: string) => {
// 		if (!text.trim()) return;

// 		unlockAudio();
// 		window.speechSynthesis.cancel();

// 		const utterance = new SpeechSynthesisUtterance(text);
// 		utterance.lang = "en-US";

// 		const preferredVoice = voicesRef.current.find((v) =>
// 			v.name.includes("Google US English"),
// 		);
// 		if (preferredVoice) utterance.voice = preferredVoice;

// 		setTimeout(() => {
// 			window.speechSynthesis.speak(utterance);
// 		}, 150);
// 	};

// 	return { speak };
// }
