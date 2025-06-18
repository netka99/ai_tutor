// // components/TTSButton.tsx
// import { useSpeechStore } from "@/store/speechStore";

// export function TTSButton() {
// 	const speak = useSpeechStore((s) => s.speak);
// 	return <button onClick={speak}>🔈 Speak Response</button>;
// }

// components/TTSButton.tsx
import { useSpeechStore } from "@/store/speechStore";
import { Volume2 } from "lucide-react";

type Props = {
	text: string;
};

export function TTSButton({ text }: Props) {
	const setOutputText = useSpeechStore((s) => s.setOutputText);
	const speak = useSpeechStore((s) => s.speak);

	const handleClick = () => {
		setOutputText(text);
		speak();
	};

	return (
		<button
			onClick={handleClick}
			className="ml-2 inline-flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 hover:bg-gray-300"
			title="Listen"
		>
			<Volume2 size={16} />
		</button>
	);
}
