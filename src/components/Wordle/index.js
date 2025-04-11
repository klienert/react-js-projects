//  https://youtu.be/WDTNwmXUz2c?si=4OaHhETM3SvczXFw

import './styles.css';
import Board from "./Board";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from './GameOver';
import WorldleWord from './WordleWord';

export const WordleContext = createContext();

const Wordle = () => {

    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0}); // each attempt and letter inputs
    const [attempts, setAttempts] = useState({ attempt: 0, desc: []}); // fired at each enter()
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState(new Set());
    const [correctLetters, setCorrectLetters] = useState(new Set());
    const [presentLetters, setPresentLetters] = useState(new Set());
    const [correctWord, setCorrectWord] = useState("");
    
    const [gameOver, setGameOver] = useState({
        gameOver: false, 
        guessedWord: false});

    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            // setCorrectWord(words.todaysWord);
            setCorrectWord("TIGHT");
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
        
        const wordCheck = new WorldleWord(correctWord, currWord);
        const results = wordCheck.getResults();
        setAttempts(prev => ({
            attempt: prev.attempt + 1, 
            desc: [...prev.desc, results.feedback]
        }));
        
        setDisabledLetters(prev => new Set([...prev, ...results.disabledLetters]));
        setCorrectLetters(prev => new Set([...prev, ...results.correctLetters]));
        setPresentLetters(prev => new Set([...prev, ...results.presentLetters]));

            

        // game won
        if (currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true});
            return;
        }

        // game lost
        if (currAttempt.attempt === 5) {
            setGameOver({gameOver: true, guessedWord: false});
            return;
        }
    }


    return (
        <div>        
            <div className="wordle-nav">
                <h1>Wordle</h1>
            </div>
            <WordleContext.Provider 
                value={ { board, 
                    setBoard, 
                    currAttempt, 
                    setCurrAttempt, 
                    onEnter,
                    onDelete,
                    onSelectLetter, 
                    correctWord,
                    disabledLetters,
                    correctLetters,
                    setCorrectLetters,
                    presentLetters,
                    gameOver,
                    setGameOver, 
                    attempts
                } }>
                <div className="game">
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </div>
            </WordleContext.Provider>
        </div>
    )
}

export default Wordle;