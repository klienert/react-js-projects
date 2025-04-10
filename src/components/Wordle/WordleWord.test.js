import "@testing-library/jest-dom";
import WordleWord from "./WordleWord";

describe('WordleWord', () => {
    let wordle;

    beforeEach(() => {
        wordle = new WordleWord('THIGH', 'TIGHT')
    });

    // test('should return the correct word', () => {
    //     expect(wordle.getCorrectWord()).toBe('THIGH');
    // });

    // test('should return the guess word', () => {
    //     expect(wordle.getGuessWord()).toBe('TIGHT');
    // })

    // test('testing array', () => {
    //     expect(wordle.getGuessArr()).toStrictEqual(['T', 'I', 'G', 'H', 'T'])
    // })

    // test('testing feedback', () => {
    //     expect(wordle.getLetterFeedback()).toStrictEqual(
    //         ['correct','present','present','present','absent']
    //     )
    // })

    test('CRANE v. CRANK', () => {
        const word = new WordleWord('CRANE', 'CRANK'); 
        expect(word.getLetterFeedback()).toStrictEqual(
            ['correct', 'correct', 'correct', 'correct', 'absent']
        )
    })

    test('CRANE v. CLEAN', () => {
        const word = new WordleWord('CRANE', 'CLEAN'); 
        expect(word.getLetterFeedback()).toStrictEqual(
            ['correct', 'absent', 'present', 'present', 'present']
        )
    })

    test('HOUSE v MOUSE', () => {
        const word = new WordleWord('HOUSE', 'MOUSE');
        expect(word.getLetterFeedback()).toStrictEqual(
            ['absent', 'correct', 'correct', 'correct', 'correct']
        );
    })

    test('MOUSE v. MOOSE', () => {
        const word = new WordleWord('MOUSE', 'MOOSE');
        expect(word.getLetterFeedback()).toStrictEqual(
            ['correct', 'correct', 'absent', 'correct', 'correct']
        )
    })

    test('CRANE v PIOUS', () => {
        const word = new WordleWord('crane', 'pious');
        expect(word.getLetterFeedback()).toStrictEqual(
            ['absent', 'absent', 'absent', 'absent', 'absent']
        )
    })

    test("TREAT v. WHEAT", () => {
        const word = new WordleWord('treat', 'wheat');
        expect(word.getLetterFeedback()).toStrictEqual(
            ['absent', 'absent', 'correct', 'correct', 'correct']
        )
    })

    test('PLANT v LLAMA', () => {
        const word = new WordleWord('plant', 'llama');
        expect(word.getLetterFeedback()).toStrictEqual(
            ['absent', 'correct', 'correct', 'absent', 'absent']
        )
    })

    test('SHEEP v PEEPS', () => {
        const word = new WordleWord('SHEEP', 'PEEPS');
        expect(word.getLetterFeedback()).toStrictEqual(
            ['present', 'present', 'correct', 'absent', 'present']
        )
    })

    test('CRANE v CRAMP', () => {
        const word = new WordleWord('CRANE', 'CRAMP');
        expect(word.getDisableLetters()).toStrictEqual(['M', 'P'])
    })
})