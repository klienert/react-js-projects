class WordleWord {

    // private variables
    #disabledLetter = [];

    /**
     * WordleWord constructor
     * @param {string} correctWord - the word of the day
     * @param {string} guessWord - guess word
     */
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

    // split guess word into array
    getGuessArr() {
        let arr = this.guessWord.toUpperCase().split("");
        return arr;
    }

    /**
     * loops through the word array twice, checking letters/positions to the correct word
     * @returns array of descriptive classNames for each letter
     */
    getLetterFeedback() {
        // correct, absent, present-in-another-position
        const correct = this.correctWord.toUpperCase().split("");
        const guess = this.guessWord.toUpperCase().split("");
        const feedback = Array(guess.length).fill('absent');
        const used = Array(correct.length).fill(false);

        // first pass:
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === correct[i]) {
                feedback[i] = 'correct';
                used[i] = 'correct';
            }
        }

        // second pass: 
        for (let i = 0; i < guess.length; i++) {
            if (feedback[i] === 'correct') continue;
            for (let j = 0; j < correct.length; j++) {
                if (!used[j] && guess[i] === correct[j]) {
                    feedback[i] = 'present';
                    used[j] = true;
                    break;
                }
            }
        }
        return feedback;    
    }
    
    getDisableLetters() {
        const correct = this.correctWord.toUpperCase().split("");
        const guess = this.guessWord.toUpperCase().split("");
        const correctSet = new Set(correct);
        const result = new Set();
               
        for (let letter of guess) {
            if (!correctSet.has(letter)) {
                result.add(letter);
            }
        }
       
        return Array.from(result);
    }
}

export default WordleWord;