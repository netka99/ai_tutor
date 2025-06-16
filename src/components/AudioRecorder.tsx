import React, { useState, useEffect, useRef } from "react";

export default function SpeechDemo() {
	const [text, setText] = useState("");
	const recognitionRef = useRef<any>(null);
	const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

	// Load and store available voices
	useEffect(() => {
		const loadVoices = () => {
			const voices = window.speechSynthesis.getVoices();
			voicesRef.current = voices;
			console.log("Loaded voices:", voices);
		};

		loadVoices();

		if (window.speechSynthesis.onvoiceschanged !== undefined) {
			window.speechSynthesis.onvoiceschanged = () => {
				console.log("🔁 Voices changed from event");
				loadVoices();
			};
		}
	}, []);

	// Setup speech recognition
	useEffect(() => {
		const SpeechRecognition =
			(window as any).SpeechRecognition ||
			(window as any).webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert("Speech recognition not supported in this browser.");
			return;
		}
		const recognition = new SpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onresult = (event: any) => {
			setText(event.results[0][0].transcript);
		};

		recognition.onerror = (event: any) => {
			console.error("❌ Speech recognition error", event.error);
		};

		recognitionRef.current = recognition;
	}, []);

	const startListening = () => {
		recognitionRef.current?.start();
	};

	// Unlock Chrome TTS (audio context) with a dummy utterance
	const unlockAudio = () => {
		const dummy = new SpeechSynthesisUtterance(" ");
		dummy.volume = 0;
		dummy.rate = 10;
		window.speechSynthesis.speak(dummy);
	};

	// Speak the current text
	const speak = () => {
		if (!window.speechSynthesis) {
			alert("TTS not supported.");
			return;
		}
		if (!text.trim()) {
			alert("Please enter or recognize some text first.");
			return;
		}

		console.log("🎤 Speaking now...");
		unlockAudio();
		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";

		// Try to pick a reliable voice
		const voice = voicesRef.current.find((v) =>
			v.name.includes("Google US English"),
		);
		if (voice) utterance.voice = voice;

		utterance.onstart = () => console.log("🔊 TTS started");
		utterance.onend = () => console.log("✅ TTS ended");
		utterance.onerror = (e) => console.error("❌ TTS error:", e.error);

		// Slight delay after unlock
		setTimeout(() => {
			window.speechSynthesis.speak(utterance);
		}, 150);
	};

	// 🔬 Test TTS output with a known phrase
	const testSpeechOutput = () => {
		if (!window.speechSynthesis) {
			alert("TTS not supported.");
			return;
		}
		console.log("🔁 Testing speech...");

		unlockAudio();
		window.speechSynthesis.cancel();

		const testUtterance = new SpeechSynthesisUtterance(
			"This is a test of the speech output. If you hear this, TTS is working.",
		);
		testUtterance.lang = "en-US";

		// Optional: force specific voice
		const voice = voicesRef.current.find((v) =>
			v.name.includes("Google US English"),
		);
		if (voice) testUtterance.voice = voice;

		testUtterance.onstart = () => console.log("🔊 Test TTS started");
		testUtterance.onend = () => console.log("✅ Test TTS ended");
		testUtterance.onerror = (e) => console.error("❌ Test TTS error:", e.error);

		setTimeout(() => {
			window.speechSynthesis.speak(testUtterance);
		}, 150);
	};

	return (
		<div>
			<h3>Speech Recognition (STT) & Text-to-Speech (TTS) Demo</h3>
			<button onClick={startListening}>🎙 Start Speech Recognition</button>
			<textarea
				rows={5}
				cols={40}
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Recognized or typed text"
			/>
			<br />
			<button onClick={speak} disabled={!text.trim()}>
				🔈 Speak Text (TTS)
			</button>
			<br />
			<button onClick={testSpeechOutput}>🧪 Test TTS Output</button>
		</div>
	);
}
