import React from "react";

const ScoreBar = ({ score }) => {

    return (
        <div className="snake-score-bar">
            <h3>{score}</h3>
        </div>
    )
}

export default ScoreBar;