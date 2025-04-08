class WorldleWord {
    constructor(correctWord, guessWord) {
        this.correctWord = correctWord.toLowerCase();
        this.guessWord = guessWord.toLowerCase();
    }

    // Getters
    getCorrectWord() {
        return this.correctWord.toUpperCase();
    }

    getGuessWord() {
        return this.guessWord.toUpperCase();
    }
    
    // Setters

    print() {
        console.log(`Wordle Word of the Day: ${this.correctWord}\nThe current Guess is: ${this.guessWord}`);
    }

    

    // wordArray() {
    //     return this.word.split('');
    // }
}

export default WorldleWord;