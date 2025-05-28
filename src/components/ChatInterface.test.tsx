import { render, screen } from "@testing-library/react";
import { useAppStore } from "../store/useAppStore";
import ChatInterface from "./ChatInterface";

jest.mock("../store/useAppStore", () => ({
	useAppStore: jest.fn(),
}));

describe("ChatInterface", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(useAppStore as unknown as jest.Mock).mockReturnValue({
			level: "beginner",
			langToLearn: "english",
			userRole: "waiter",
			roles: ["waiter", "customer"],
			userInput: "",
			chatMessages: [],
			addChatMessage: jest.fn(),
			setUserInput: jest.fn(),
			description: "You are a waiter",
			aiRole: "customer",
		});
	});

	it("renders chat UI elements", () => {
		render(<ChatInterface />);
		expect(screen.getByText("Chat")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Type your message..."),
		).toBeInTheDocument();
		expect(screen.getByText("Send")).toBeInTheDocument();
	});

	it("renders chat messages correctly", () => {
		(useAppStore as unknown as jest.Mock).mockReturnValue({
			level: "beginner",
			langToLearn: "english",
			userRole: "waiter",
			roles: ["waiter", "customer"],
			userInput: "",
			chatMessages: [
				{ sender: "user", text: "Hello" },
				{ sender: "tutor", text: "Hi there!" },
			],
			addChatMessage: jest.fn(),
			setUserInput: jest.fn(),
			description: "You are a waiter",
			aiRole: "customer",
		});
		render(<ChatInterface />);
		expect(
			screen.getByText((_, node) => node?.textContent === "waiter: Hello"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				(_, node) => node?.textContent === "customer: Hi there!",
			),
		).toBeInTheDocument();
	});
});
