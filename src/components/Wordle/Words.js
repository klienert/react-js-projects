import wordBank from './word-answers.txt';
import guessBank from './word-guesses.txt';

export const boardDefault = new Array(6).fill(null).map(() => 
    new Array(5).fill(""));

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
        });
    // combine guess words and correct words to one large set
    if (wordArr.length > 0 && guessArr.length > 0) {
        wordSet = new Set([...wordArr, ...guessArr]);
    }

    
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    
    // console.log(todaysWord);

    return { wordSet, todaysWord};
}