import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feedback from "./Feedback";
import { useAppStore } from "../store/useAppStore";

jest.mock("../store/useAppStore", () => ({
	useAppStore: jest.fn(),
}));

global.fetch = jest.fn();

describe("Feedback", () => {
	const setFeedbackMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		(useAppStore as unknown as jest.Mock).mockReturnValue({
			level: "beginner",
			langToLearn: "english",
			nativeLang: "polish",
			feedback: {
				mistakes: [
					{
						original: "",
						correction: "",
						explanation: "",
					},
				],
				overallFeedback: "",
				topicsToReview: [],
			},
			setFeedback: setFeedbackMock,
		});
	});

	it("renders the button", () => {
		render(<Feedback />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
	it("calls fetch and updates feedback on button click", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				feedback: {
					mistakes: [
						{
							original: "can I get menu?",
							correction: "Can I get a menu?",
							explanation:
								"Brakuje przedimka 'a' przed rzeczownikiem 'menu'. Używamy 'a' gdy mówimy o czymś po raz pierwszy lub gdy nie jest to konkretny, sprecyzowany element.",
						},
					],
					overallFeedback:
						"Ogólnie, twoje zdania są zrozumiałe i komunikatywne.",
					topicsToReview: [
						"Przedimki (a/an/the)",
						"Szyk słów w pytaniach",
						"Różnica między rzeczownikiem a czasownikiem",
					],
				},
			}),
		});

		render(<Feedback />);
		const getFeedbackButton = screen.getByText("Give me Feedback");
		fireEvent.click(getFeedbackButton);

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith(
				"/api/feedback",
				expect.any(Object),
			);
			expect(setFeedbackMock).toHaveBeenCalledWith({
				mistakes: [
					{
						original: "can I get menu?",
						correction: "Can I get a menu?",
						explanation:
							"Brakuje przedimka 'a' przed rzeczownikiem 'menu'. Używamy 'a' gdy mówimy o czymś po raz pierwszy lub gdy nie jest to konkretny, sprecyzowany element.",
					},
				],
				overallFeedback:
					"Ogólnie, twoje zdania są zrozumiałe i komunikatywne.",
				topicsToReview: [
					"Przedimki (a/an/the)",
					"Szyk słów w pytaniach",
					"Różnica między rzeczownikiem a czasownikiem",
				],
			});
		});
	});
});
