import React from "react";

const ScoreBar = ({ score, isGameOver, collision }) => {

    return (
        <div className="snake-score-bar">
            <h3>{score}</h3>
            {collision && <h3 className="snake-score-game-over">Game Over</h3> }
        </div>
    )
}

export default ScoreBar;