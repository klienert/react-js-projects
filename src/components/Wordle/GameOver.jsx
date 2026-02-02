import React, { useContext } from "react";
import { WordleContext } from "./index";

function GameOver() {

    const {
        gameOver,
        currAttempt,
        correctWord
    } = useContext(WordleContext)

    return (
        <div className="gameOver">
            <h3>{gameOver.guessedWord 
                ? "You Won!" 
                : "Sorry, please try again."}
            </h3>            
            <h4 className=
                {gameOver.guessedWord ? "correctWord" : "incorrectWord"}
            >{correctWord}</h4>
            {gameOver.guessedWord && (
                <h3>You guessed in {currAttempt.attempt} attempts</h3>
            )}
        </div>
    )
}

export default GameOver;