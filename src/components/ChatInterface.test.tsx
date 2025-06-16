import { render, screen, waitFor } from "@testing-library/react";
import { useAppStore } from "../store/useAppStore";
import ChatInterface from "./ChatInterface";
import userEvent from "@testing-library/user-event";

jest.mock("../store/useAppStore", () => ({
	useAppStore: jest.fn(),
}));

global.fetch = jest.fn();

describe("ChatInterface", () => {
	const addChatMessageMock = jest.fn();
	const setSentenceCountMock = jest.fn();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let currentUserInput = "";

	beforeAll(() => {
		window.HTMLElement.prototype.scrollIntoView = jest.fn();
	});

	beforeEach(() => {
		jest.clearAllMocks();
		currentUserInput = "";

		(useAppStore as unknown as jest.Mock).mockReturnValue({
			level: "beginner",
			langToLearn: "english",
			userRole: "waiter",
			roles: ["waiter", "customer"],
			userInput: "",
			chatMessages: [],
			addChatMessage: addChatMessageMock,
			setUserInput: (val: string) => {
				currentUserInput = val;
			},
			description: "You are a waiter",
			aiRole: "customer",
			setSentenceCount: setSentenceCountMock,
			sentenceCount: 0,
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
			setSentenceCount: jest.fn(),
			sentenceCount: 0,
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
	it("sends message and receives AI reply", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ reply: "Hello, how can I help?" }),
		});
		const { rerender } = render(<ChatInterface />);
		const input = screen.getByPlaceholderText("Type your message...");
		await userEvent.type(input, "Hi!");

		(useAppStore as unknown as jest.Mock).mockImplementation(() => ({
			level: "beginner",
			langToLearn: "english",
			userRole: "waiter",
			roles: ["waiter", "customer"],
			userInput: "Hi!",
			chatMessages: [],
			addChatMessage: addChatMessageMock,
			setUserInput: (val: string) => {
				currentUserInput = val;
			},
			description: "You are a waiter",
			aiRole: "customer",
			setSentenceCount: setSentenceCountMock,
			sentenceCount: 0,
		}));

		rerender(<ChatInterface />);

		const sendButton = screen.getByText("Send");
		userEvent.click(sendButton);

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith("/api/chat", expect.any(Object));
			expect(addChatMessageMock).toHaveBeenCalledWith({
				sender: "user",
				text: "Hi!",
			});
		});
	});
});
