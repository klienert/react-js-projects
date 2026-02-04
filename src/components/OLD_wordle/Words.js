import wordBank from './word-answers.txt';
import guessBank from './word-guesses.txt';

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    let wordArr;
    let guessArr;

    await fetch(wordBank)
        .then((resp) => resp.text())
        .then((res) => {
            wordArr = res.split("\n").map(word => word.trim());
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        });

    await fetch(guessBank)
        .then((resp) => resp.text())
        .then((res) => {
            guessArr = res.split("\n").map(word => word.trim());            
        })
    // combines guess words and 'correct' words to one large set 
    if (wordArr.length > 0 && guessArr.length > 0) {
        wordSet = new Set([...wordArr, ...guessArr]);
    }

    // console.log(todaysWord);
    // console.log(wordSet);
    

    return { wordSet, todaysWord };
}