export {};

declare global {
	type SpeechRecognitionConstructor = new () => SpeechRecognition;

	interface Window {
		SpeechRecognition: SpeechRecognitionConstructor;
		webkitSpeechRecognition: SpeechRecognitionConstructor;
	}

	interface SpeechRecognition extends EventTarget {
		lang: string;
		interimResults: boolean;
		maxAlternatives: number;
		start(): void;
		stop(): void;
		abort(): void;

		onaudiostart: ((this: SpeechRecognition, ev: Event) => void) | null;
		onaudioend: ((this: SpeechRecognition, ev: Event) => void) | null;
		onend: ((this: SpeechRecognition, ev: Event) => void) | null;
		onerror:
			| ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
			| null;
		onnomatch:
			| ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
			| null;
		onresult:
			| ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
			| null;
		onsoundstart: ((this: SpeechRecognition, ev: Event) => void) | null;
		onsoundend: ((this: SpeechRecognition, ev: Event) => void) | null;
		onspeechstart: ((this: SpeechRecognition, ev: Event) => void) | null;
		onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null;
		onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
	}

	interface SpeechRecognitionEvent extends Event {
		results: SpeechRecognitionResultList;
	}

	interface SpeechRecognitionResultList {
		[index: number]: SpeechRecognitionResult;
		length: number;
		item(index: number): SpeechRecognitionResult;
	}

	interface SpeechRecognitionResult {
		[index: number]: SpeechRecognitionAlternative;
		length: number;
		isFinal: boolean;
		item(index: number): SpeechRecognitionAlternative;
	}

	interface SpeechRecognitionAlternative {
		transcript: string;
		confidence: number;
	}

	interface SpeechRecognitionErrorEvent extends Event {
		error: string;
		message: string;
	}
}
