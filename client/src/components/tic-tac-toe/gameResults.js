import React, { useState } from "react";

const GameResults = () => {

    const [winMessage, setWinMessage] = useState(null);
    const [message, setMessage] = useState(null);

    return (
        <div className="game-results">            
            <p></p>
        </div>
    )
}

export default GameResults;