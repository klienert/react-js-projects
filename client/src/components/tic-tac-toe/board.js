import React, { useState } from "react";
import Cell from "./cell";

const Board = () => {
    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", "" ]);
    const [winMessage, setWinMessage] = useState(null);
    const [go, setGo] = useState("circle");

    const message = "it is now " + go + "'s go.";

    return (
        <div className="tt-board">
            {cells.map((cell, index) => 
                <Cell 
                    key={index}
                    id={index}
                    cell={cell}
                />
            )}
        </div>
    )
}

export default Board;