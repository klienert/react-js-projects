import "@testing-library/jest-dom";
import WordleGame from "./WordleGame";

jest.mock('./Words', () => ({
    generateWordSet: async () => ({
      wordSet: new Set(['sleep', 'sheep', 'apple', 'banana']),
      todaysWord: 'banana'
    })
}));


describe('WordleGame', () => {
    beforeAll(async () => {
        await WordleGame.initWordSet();
    });
    
    test('testing isValidWord --> FALSE', () => {
        const game = new WordleGame('SLEEP', 'XXXXX');        
        expect(game.isValidWord()).toBe(false);
    })

    test('testing isValidWord --> TRUE', () => {
        const game = new WordleGame('SLEEP', 'SHEEP');        
        expect(game.isValidWord()).toBe(true);
    })

})