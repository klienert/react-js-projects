import React from "react";
import './styles.css';
import Board from "./Board";
import ScoreBar from "./ScoresBar";

const SnakeGame = () => {

    return (
        <section className="snake-container">
            <div className="snake-title">
                <h2>Snake Game</h2>
            </div>
            <ScoreBar />
            <Board />
        </section>
    )
}

export default SnakeGame;