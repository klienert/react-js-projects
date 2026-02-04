//  https://youtu.be/WDTNwmXUz2c?si=4OaHhETM3SvczXFw

import './newStyles.css';
import Board from "./Board";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from './GameOver';

export const AppContext = createContext();

function Wordle () {

    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [correctWord, setCorrectWord] = useState("");    
    const [gameOver, setGameOver] = useState({
        gameOver: false, 
        guessedWord: false});

    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord);
        })
    }, [] );


    const onSelectLetter = (keyVal) => {
        if (currAttempt.letterPos > 4) return; // end function at length of 5
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
    }

    const onDelete = () => {
        if (currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
    }

    const onEnter = () => {
        if (currAttempt.letterPos !== 5) return;

        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i];            
        }

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
        } else {
            alert("Word is not a Wordle word.");
        }
        // console.log(currAttempt.attempt);
        // console.log("Current Word: " + currWord.toLowerCase());
        // console.log("Correct Word: " + correctWord);

        if (currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true});
            return;
        }

        if (currAttempt.attempt === 5) {
            setGameOver({gameOver: true, guessedWord: false});
        }
    }

    return (
        <div>        
            <div className="wordle-nav">
                <h1>Wordle</h1>
            </div>
            <AppContext.Provider 
                value={ { board, 
                    setBoard, 
                    currAttempt, 
                    setCurrAttempt, 
                    onEnter,
                    onDelete,
                    onSelectLetter, 
                    correctWord,
                    disabledLetters,
                    setDisabledLetters,
                    correctLetters,
                    setCorrectLetters,
                    gameOver,
                    setGameOver
                } }>
                <div className="game">
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </div>
            </AppContext.Provider>
        </div>
    )
}

export default Wordle;