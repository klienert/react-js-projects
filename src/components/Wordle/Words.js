import { wordAnswers } from './word-answers.js';
import { wordGuesses } from './word-guesses.js';

export const boardDefault = new Array(6).fill(null).map(() => 
    new Array(5).fill(""));

export const generateWordSet = async () => {

    const wordSet = new Set([...wordAnswers, ...wordGuesses]);
    const todaysWord = Array.from(wordAnswers)[Math.floor(Math.random() * wordAnswers.size)];
    
    return { wordSet, todaysWord};
}