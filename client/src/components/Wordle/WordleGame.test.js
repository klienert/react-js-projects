import "@testing-library/jest-dom";
import WordleGame from "./WordleGame";
import { generateWordSet } from "./Words";

describe('WordleGame', () => {
    let wordSet;

    beforeAll(async () => {
        const generated = await generateWordSet();
        wordSet = generated.wordSet;
    });

    // using async/await for asynchronous access to entire wordSet

    test('testing isValidWord --> FALSE', async () => {
        const game = new WordleGame('SLEEP', 'XXXXX');
        await game.init();
        expect(game.isValidWord()).toBe(false);
    })

    test('testing isValidWord --> TRUE', async () => {
        const game = new WordleGame('SLEEP', 'SHEEP');
        await game.init();
        expect(game.isValidWord()).toBe(true);
    })

    test('get correct word', () => {
        const game = new WordleGame('STARE', 'SLEEP');
        expect(game.getCorrectWord()).toBe('STARE');
    })

    test('get GuessWord',() => {
        const game = new WordleGame('STARE', 'SWAMP');
        expect(game.getGuessWord()).toBe('SWAMP');
    })

})