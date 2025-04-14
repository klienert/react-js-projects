import { wordAnswers } from './word-answers.js';
import { wordGuesses } from './word-guesses.js';

export const boardDefault = new Array(6).fill(null).map(() => 
    new Array(5).fill(""));

export const generateWordSet = async () => {
    
    // const wordArr = await fetch(wordBank)
    //     .then(resp => resp.text())
    //     .then(res => res.split("\n").map(word => word.trim()));    

    // const guessArr = await fetch(guessBank)
    //     .then(resp => resp.text())
    //     .then(res => res.split("\n").map(word => word.trim()));

    // const wordSet = new Set([...wordArr, ...guessArr]);
    // const todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];

    const wordSet = new Set([...wordAnswers, ...wordGuesses]);
    const todaysWord = Array.from(wordAnswers)[Math.floor(Math.random() * wordAnswers.size)];
    
    return { wordSet, todaysWord};
}