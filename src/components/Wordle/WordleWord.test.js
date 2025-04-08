import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorldleWord from "./WordleWord";

describe('WordleWord', () => {
    let wordle;

    beforeEach(() => {
        wordle = new WorldleWord('THIGH', 'TIGHT')
    });

    test('should return the correct word', () => {
        expect(wordle.getCorrectWord()).toBe('THIGH');
    });

    test('should return the guess word', () => {
        expect(wordle.getGuessWord()).toBe('TIGHT');
    })

})

/*
test.skip("renders with initial light theme", () => {
    render(<ThemeExample />);

    expect(screen.getByText("Light Theme")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Switch Theme/i })).toBeInTheDocument();
});

test.skip("toggles theme when button is clicked", () => {
    render(<ThemeExample />);

    const button = screen.getByRole("button", { name: /Switch Theme/i });

    fireEvent.click(button);
    expect(screen.getByText("Dark Theme")).toBeInTheDocument();

    //click again
    fireEvent.click(button);
    expect(screen.getByText("Light Theme")).toBeInTheDocument();

}) */