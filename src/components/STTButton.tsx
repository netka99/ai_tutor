// components/STTButton.tsx
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export function STTButton() {
	const { startListening } = useSpeechRecognition();

	return <button onClick={startListening}>🎙️ Start Listening</button>;
}
