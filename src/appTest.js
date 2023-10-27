import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the 'React - Learn' link", () => {
  render(<App />);
  const linkTheElement = screen.getByText(/learn react/i);
  expect(linkTheElement).toBeInTheDocument();
});
