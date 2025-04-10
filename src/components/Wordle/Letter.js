import React, { useContext, useEffect } from "react";
import { WordleContext } from "./index";

const Letter = ({ letterPos, attemptVal }) => {
    const { 
        board, 
        correctWord, 
        currAttempt,
        disabledLetters,
        setCorrectLetters, 
        attempts
    } = useContext(WordleContext);
    
    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);    
    
    // TODO: ReFactor how the correct/almost is configured --> Keyboard and Answer Display        

       
    const newLetterState = '';
    if (letter === attempts.desc[letterPos]) {
        console.log(attempts.desc[letterPos]);
    }
    //     attempts.desc.forEach((i, letter, result) => {
    //         console.log(`${i}) ${letter}: ${result}`);
    //     });

    const letterState = 
        currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "present" : "absent");

    useEffect(() => {
        if (letter !== "" && !almost && correct) {
            setCorrectLetters((prev) => [...prev, letter]);
        }
    }, [almost, correct, currAttempt.attempt, letter, setCorrectLetters]);

    return (
        <div 
            className="wordle-letter" 
            id={letterState.toString()}
        >{letter}
        </div>
    )
}

export default Letter;