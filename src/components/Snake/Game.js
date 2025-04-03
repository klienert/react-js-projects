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

    const startGame = () => {
        setSnake([{x: 10, y: 10}]);
        setDirection("RIGHT");
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
        setIsGameOver(false);
        setIsPlaying(true);
    }
    console.log("Current Direction: ", direction);
    return (
        <section className="snake-container">            
            <div className="snake-title">
                <h2>Snake Game</h2>
            </div>
            {isGameOver && <h3>Please press the Spacebar to Start the game</h3>}
            <button onClick={startGame}>Start Game</button>
            <ScoreBar />
            <Board snake={snake} food={food} />
            {isPlaying && <Snake snake={snake} setSnake={setSnake} direction={direction} food={food} setFood={setFood}/>}
            <Controls setDirection={setDirection} direction={direction} />
        </section>
    )

}

export default Game;