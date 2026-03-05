import React, { useContext, useEffect } from "react";
import { AppContext } from "./index";


const Letter = ({ letterPos, attemptVal }) => {
    
    const { 
        board, 
        correctWord, 
        currAttempt,
        setDisabledLetters,
        setCorrectLetters
    } = useContext(AppContext);

    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

    // console.log(currAttempt.attempt);
    // console.log(attemptVal);
    // console.log(correct);
    // console.log(almost);

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
        <div className="letter" id={letterState.toString()}>
            {letter}
        </div>
    )
}

export default Letter;