import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeExample from "./index";



test.skip("renders with initial light theme", () => {
    render(<ThemeExample />);

    expect(screen.getByText("Light Theme")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Switch Theme/i })).toBeInTheDocument();
});

// test.only("toggles theme when button is clicked", () => {
//     render(<ThemeExample />);

//     const button = screen.getByRole("button", { name: /Switch Theme/i });

//     fireEvent.click(button);
//     expect(screen.getByText("Dark Theme")).toBeInTheDocument();

//     //click again
//     fireEvent.click(button);
//     expect(screen.getByText("Light Theme")).toBeInTheDocument();

// })