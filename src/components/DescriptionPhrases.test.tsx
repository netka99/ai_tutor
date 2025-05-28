import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DescriptionPhrases from "./DescriptionPhrases";
// import userEvent from "@testing-library/user-event";
import { useAppStore } from "../store/useAppStore";

jest.mock("../store/useAppStore", () => ({
	useAppStore: jest.fn(),
}));

global.fetch = jest.fn();

describe("DescriptionPhrases", () => {
	const setUserRoleMock = jest.fn();
	const setPhrasesMock = jest.fn();

	beforeEach(() => {
		// ✅ Reset mocks before each test
		jest.clearAllMocks();

		(useAppStore as unknown as jest.Mock).mockReturnValue({
			description: "You are a waiter in a restaurant",
			roles: ["waiter", "customer"],
			level: "beginner",
			langToLearn: "english",
			phrases: [],
			setUserRole: setUserRoleMock,
			setPhrases: setPhrasesMock,
		});
	});

	it("renders description text", () => {
		render(<DescriptionPhrases />);
		expect(screen.getByText(/you are a waiter/i)).toBeInTheDocument();
	});

	it("calls fetch and updates phrases on button click", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				phrases: ["Welcome!", "Would you like the menu?"],
			}),
		});

		render(<DescriptionPhrases />);
		const waiterButton = screen.getByText("waiter");
		fireEvent.click(waiterButton);

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledWith("/api/phrases", expect.any(Object));
			expect(setUserRoleMock).toHaveBeenCalledWith("waiter");
			expect(setPhrasesMock).toHaveBeenCalledWith([
				"Welcome!",
				"Would you like the menu?",
			]);
		});
	});
});
