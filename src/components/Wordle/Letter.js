import React, { useContext, useEffect } from "react";
import { WordleContext } from "./index";
import { TbLetterV } from "react-icons/tb";


const Letter = ({ letterPos, attemptVal }) => {
    
    const { 
        board, 
        correctWord, 
        currAttempt,
        setDisabledLetters,
        setCorrectLetters
    } = useContext(WordleContext);

    const letter = board[attemptVal][letterPos];    
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    const correctWordArr = correctWord.toUpperCase().split(""); // the correct word
    const guessArr = board[attemptVal].map(l => l.toUpperCase());
    
    // count occurences
    let letterCounts = {};
    correctWordArr.forEach(letter => {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    });

    let correctFlags = new Array(guessArr.length).fill(false);
    for (let i = 0; i < guessArr.lengtgh; i++) {
        if (guessArr[i] === correctWordArr[i]) {
            correctFlags[i] = true;
            letterCounts[guessArr[i]]--; // reduce available count
        }
    }

    let letterArr = {
        "letter":letter,
        "pos":letterPos,
        "attempt":attemptVal
    };
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

    // useEffect(() => {
    //     if (letter !== "" && letterState === "error") {
    //         setDisabledLetters((prev) => [...new Set([...prev, letter])]);
    //     }
    //     if (letter !== "" && letterState === "correct") {
    //         setCorrectLetters((prev) => [...new Set([...prev, letter])]);
    //     }

    // }, [almost, correct, currAttempt.attempt, letter, setDisabledLetters, setCorrectLetters]);

    return (
        <div className="wordle-letter" id={letterState.toString()}>
            {letter}
        </div>
    )
}

export default Letter;