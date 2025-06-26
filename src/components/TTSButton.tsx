import { useSpeechStore } from "@/store/speechStore";
import { useAppStore } from "@/store/useAppStore";
import { Volume2 } from "lucide-react";

type Props = {
	text: string;
};

export function TTSButton({ text }: Props) {
	const setOutputText = useSpeechStore((s) => s.setOutputText);
	const speak = useSpeechStore((s) => s.speak);
	const ttsLangCode = useAppStore((s) => s.ttsLangCode);

	const handleClick = () => {
		setOutputText(text);
		speak(ttsLangCode);
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
