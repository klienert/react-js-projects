import "@testing-library/jest-dom";
import WordleGame from "./WordleGame";
// import { wordAnswers, wordGuesses } from "./Words";
import { wordSet } from "./Words.js";

// const mockWordset = new Set([...wordAnswers, ...wordGuesses]);

describe('WordleGame', () => {
    test('testing isValidWord --> FALSE', () => {
        const game = new WordleGame('SLEEP', 'XXXXX', wordSet);
        expect(game.isValidWord()).toBe(false);
    })

    test('testing isValidWord --> TRUE', () => {
        const game = new WordleGame('SLEEP', 'SHEEP', wordSet);        
        expect(game.isValidWord()).toBe(true);
    })

})