import React, { useContext } from "react";
import { AppContext } from "./index";

function GameOver() {

    const { 
        board,
        setBoard,
        gameOver, 
        currAttempt, 
        setGameOver, 
        correctWord 
    } = useContext(AppContext)

    return (
        <div className="gameOver">
            <h3>{gameOver.guessedWord 
                ? "You Won!" 
                : "Sorry, please try again"}
            </h3>
            <h4>Correct: {correctWord}</h4>
            {gameOver.guessedWord && (
                <h3>You guessed in {currAttempt.attempt} attempts</h3>
            )}
        </div>
    )
}

export default GameOver;