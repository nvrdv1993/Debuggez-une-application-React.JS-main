import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.queryByText("Message envoyé"), { timeout: 3000 }); // utilisation de waitfor comme pour le formulaire
    });
  });
});

describe("When a page is created", () => {
  it("a list of people is displayed", () => {
    render(<Home />);
    const peopleList = screen.getByTestId("people-list");
    expect(peopleList).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Home />);
    const testFooter = screen.getByTestId("test-footer");
    expect(testFooter).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const lastEvent = screen.getByTestId("last-event");
    expect(lastEvent).toBeInTheDocument();
  });
});
