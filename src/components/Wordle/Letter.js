import React, { useContext, useEffect } from "react";
import { WordleContext } from "./index";

const Letter = ({ letterPos, attemptVal }) => {
    // console.log("letter comp rendered");
    const { 
        board, 
        correctWord, 
        currAttempt,
        setDisabledLetters,
        setCorrectLetters, 
        letterCount
    } = useContext(WordleContext);

    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    // const correctWordArr = correctWord.toUpperCase().split(""); // the correct word
    // const guessArr = board[attemptVal].map(l => l.toUpperCase());

    // TODO: ReFactor how the correct/almost is configured --> Keyboard and Answer Display
    
    
    // console.log(letterCount);
    
    // count occurences
    // let letterCounts = {};
    // correctWordArr.forEach(letter => {
    //     letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    // });

    // let correctFlags = new Array(guessArr.length).fill(false);
    // for (let i = 0; i < guessArr.lengtgh; i++) {
    //     if (guessArr[i] === correctWordArr[i]) {
    //         correctFlags[i] = true;
    //         letterCounts[guessArr[i]]--; // reduce available count
    //     }
    // }

    // let letterArr = {
    //     "letter":letter,
    //     "pos":letterPos,
    //     "attempt":attemptVal
    // };

    // console.log(letterArr);

    const letterState =
        currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter]);
        }
        if (letter !== "" && !almost && correct) {
            setCorrectLetters((prev) => [...prev, letter]);
        }
        }, [almost, correct, currAttempt.attempt, letter, setDisabledLetters, setCorrectLetters]);

    return (
        <div 
            className="wordle-letter" 
            id={letterState.toString()}
        >{letter}
        </div>
    )
}

export default Letter;