import React, { useEffect, useState } from "react";
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
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(300);
    const [collision, setCollision] = useState(false);


    const startGame = () => {
        setSnake([{x: 10, y: 10}]);
        setDirection("RIGHT");
        // setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
        setIsGameOver(false);
        setIsPlaying(true);
        setIsPaused(false);
        setCollision(false);
    }

    const stopGame = () => {
        setSnake([{x: 10, y: 10}]);
        setDirection("RIGHT");
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
        setIsGameOver(true);
        setIsPlaying(false);
        setScore(0);
        setIsPaused(false);
    }

    const gameOver = () => {
        setIsGameOver(true);
        setIsPlaying(false);
        setIsPaused(false);
    }

    const pauseGame = () => {
        setIsPlaying(false);
        setIsPaused(true);
    }

    const resumeGame = () => {
        setIsPlaying(true);
        setIsPaused(false);
    }

    // speeds up the snake as points increase
    useEffect(() => {
        if (score > 2) {
            setSpeed((prev) => prev - 5);
        }
    }, [score]);

    useEffect(() => {
        if (collision) {
            gameOver();
        }
    },  [collision]);
    

    return (
        <section className="snake-container">            
            <div className="snake-title">
                <h2>Snake Game</h2>
            </div>
            <div className="snake-buttons">
                {/* start */}
                <button onClick={startGame}>Start Game</button>
                <button onClick={stopGame}>Stop Game</button>
                {!isGameOver && isPlaying && !isPaused && <button onClick={pauseGame}>Pause Game</button>}
                {!isGameOver && !isPlaying && isPaused && <button onClick={resumeGame}>Resume Game</button>}

            </div>
            <ScoreBar score={score} collision={collision}/>
            <Board snake={snake} food={food} />
            {isPlaying && <Snake 
                    snake={snake} 
                    setSnake={setSnake} 
                    direction={direction} 
                    food={food} 
                    setFood={setFood}
                    setScore={setScore}
                    score={score}
                    speed={speed}
                    setCollision={setCollision}
                    />}
            <Controls setDirection={setDirection} direction={direction} />            
        </section>
    )
}

export default Game;