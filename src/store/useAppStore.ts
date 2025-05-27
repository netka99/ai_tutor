import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Message = {
	sender: string;
	text: string;
};

type Feedback = {
	mistakes: { original: string; correction: string; explanation: string }[];
	overallFeedback: string;
	topicsToReview: string[];
};

interface AppState {
	userRole: string;
	description: string;
	subject: string;
	nativeLang: string;
	langToLearn: string;
	level: string;
	phrases: string[];
	chatMessages: Message[];
	userInput: string;
	feedback: Feedback;
	aiRole: string;
	sentenceCount: number;
	roles: string[];

	setUserRole: (role: string) => void;
	setDescription: (descript: string) => void;
	setSubject: (subject: string) => void;
	setNativeLang: (nativeLang: string) => void;
	setLangToLearn: (setLangToLearn: string) => void;
	setLevel: (level: string) => void;
	setPhrases: (phrases: string[]) => void;
	addChatMessage: (message: Message) => void;
	setUserInput: (userInput: string) => void;
	setFeedback: (feedback: Feedback) => void;
	setAiRole: (aiRole: string) => void;
	setSentenceCount: (sentenceCount: number) => void;
	setRoles: (roles: string[]) => void;
}

export const useAppStore = create<AppState>()(
	devtools((set) => ({
		userRole: "",
		description: "",
		subject: "",
		nativeLang: "polish",
		langToLearn: "polish",
		level: "beginner",
		phrases: [],
		chatMessages: [],
		userInput: "",
		aiRole: "",
		sentenceCount: 0,
		roles: [],

		feedback: {
			mistakes: [],
			overallFeedback: "",
			topicsToReview: [],
		},
		setUserRole: (role) => set({ userRole: role }),
		setDescription: (descript) => set({ description: descript }),
		setSubject: (subject) => set({ subject }),
		setNativeLang: (nativeLang) => set({ nativeLang }),
		setLangToLearn: (langToLearn) => set({ langToLearn }),
		setLevel: (level) => set({ level }),
		setPhrases: (phrases) => set({ phrases }),
		addChatMessage: (message) =>
			set((state) => ({ chatMessages: [...state.chatMessages, message] })),
		setUserInput: (userInput) => set({ userInput }),
		setFeedback: (feedback) => set({ feedback }),
		setAiRole: (aiRole) => set({ aiRole }),
		setSentenceCount: (sentenceCount) => set({ sentenceCount }),
		setRoles: (roles) => set({ roles }),
	})),
);
