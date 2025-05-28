import { render, screen } from "@testing-library/react";
import MainSelectors from "./MainSelectors";
import userEvent from "@testing-library/user-event";

describe("MainSelectors", () => {
	it("renders without crashing", () => {
		render(<MainSelectors />);
		expect(screen.getByText(/your native language/i)).toBeInTheDocument();
		expect(screen.getByText(/language to learn/i)).toBeInTheDocument();
		expect(screen.getByText(/ask ai tutor/i)).toBeInTheDocument();
	});
	it("renders select language button", async () => {
		render(<MainSelectors />);
		const select = screen.getByRole("combobox", {
			name: /your native language/i,
		});
		await userEvent.selectOptions(select, "english");
		expect(select).toHaveValue("english");
	});
	it("renders select subject button", async () => {
		render(<MainSelectors />);
		const select = screen.getByRole("combobox", {
			name: /choose subject/i,
		});
		await userEvent.selectOptions(select, "book an appoinment to the doctor");
		expect(select).toHaveValue("book an appoinment to the doctor");
	});
});
