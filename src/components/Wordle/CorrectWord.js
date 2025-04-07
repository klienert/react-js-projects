class CorrectWord {
    constructor(word) {
        this.word = word;
    }

    test() {
        console.log(`Wordle Word of the Day: ${this.word}`);
    }

    // wordArray() {
    //     return this.word.split('');
    // }
}

export default CorrectWord;