import { generateWordSet } from "./Words";

class WordleGame {

    constructor(correctWord, guessWord) {
        this.correctWord = correctWord.toLowerCase();
        this.guessWord = guessWord.toLowerCase();
        this.wordSet = generateWordSet;
    }

    // static method to initialize the word set
    // static async initWordSet() {
    //     const { wordSet } = await generateWordSet();
    //     WordleGame.wordSet = wordSet;
    // }

    // check if word is valid
    isValidWord = () => {
        return (wordSet?.has(this.guessWord));
    }

    // get results via WordleWord obj
    // if all are correct, game won
    // if not all are correct and > 5 attempts, game lost


}

export default WordleGame;