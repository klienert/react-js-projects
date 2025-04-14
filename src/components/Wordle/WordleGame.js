import { generateWordSet } from "./Words";

class WordleGame {


    constructor(correctWord, guessWord) {
        this.correctWord = correctWord.toLowerCase();
        this.guessWord = guessWord.toLowerCase();
        this.wordSet = null;
    }

    async init() {
        const { wordSet } = await generateWordSet();
        this.wordSet = wordSet;
    }

    
    // check if word is valid
    isValidWord() {
        return this.wordSet.has(this.guessWord);
    }

    getCorrectWord() {
        return this.correctWord.toUpperCase();
    }

    getGuessWord() {
        return this.guessWord.toUpperCase();
    }

    // get results via WordleWord obj
    // if all are correct, game won
    // if not all are correct and > 5 attempts, game lost


}

export default WordleGame;