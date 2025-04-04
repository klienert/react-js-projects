import React, { useState } from "react";
import './styles.css';
import Board from "./Board";
import Controls from "./Controls";
import Snake from "./Snake";
import ScoreBar from "./ScoresBar";

const Game = () => {
    const [snake, setSnake ] = useState([{x: 10, y: 10 }]);
    const [direction, setDirection] = useState("RIGHT");
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [isGameOver, setIsGameOver ] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);


    const startGame = () => {
        setSnake([{x: 10, y: 10}]);
        setDirection("RIGHT");
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
        setIsGameOver(false);
        setIsPlaying(true);
    }

    // TODO: configure the play, stop, pause, resume buttons/functions
    // TODO: Game over when snake collides with itself

    const stopGame = () => {
        setSnake([{x: 10, y: 10}]);
        setDirection("RIGHT");
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
        setIsGameOver(false);
        setScore(0);
    }

    const pauseGame = () => {
        setIsPlaying(false);
    }

    const resumeGame = () => {
        setIsPlaying(true);
    }
    // console.log("Current Direction: ", direction);
    // console.log(snake);
    return (
        <section className="snake-container">            
            <div className="snake-title">
                <h2>Snake Game</h2>
            </div>
            <div className="snake-buttons">                
                <button onClick={startGame}>Start Game</button>
                <button onClick={stopGame}>Stop Game</button>                
            </div>
            {isGameOver && <h3>Please press the Spacebar to Start the game</h3>}
            <ScoreBar score={score}/>
            <Board snake={snake} food={food} />
            {isPlaying && <Snake 
                    snake={snake} 
                    setSnake={setSnake} 
                    direction={direction} 
                    food={food} 
                    setFood={setFood}
                    setScore={setScore}
                    />}
            <Controls setDirection={setDirection} direction={direction} />            
        </section>
    )
}

export default Game;