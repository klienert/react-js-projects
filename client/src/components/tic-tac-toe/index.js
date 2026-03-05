import React, { useEffect, useState } from "react";
import Cell from "./cell";
import './styles.css';

const TicTacToe = () => {

    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
    const [go, setGo] = useState('circle');
    const [winMessage, setWinMessage] = useState(null);

    const msg = "it is now " + go + "'s go.";

    // const checkScore = () => {
    //     const winningCombos = [
    //         [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    //         [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    //         [0, 4, 8], [2, 4, 6] // diagonals
    //     ]

    //     winningCombos.forEach(array => {
    //         let circleWins = array.every(cell => cells[cell] === 'circle');
    //         if (circleWins) {
    //             setWinMessage("Circle Wins")
    //             return;
    //         }
    //     });

    //     winningCombos.forEach(array => {
    //         let crossWins = array.every(cell => cells[cell] === 'cross');
    //         if (crossWins) {
    //             setWinMessage("Cross Wins")
    //             return;
    //         }
    //     });
    // }
    
    //
    const checkScore = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        for (const array of winningCombos) {
            const [a, b, c] = array;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                setWinMessage(`${cells[a] === 'circle' ? 'Circle' : 'Cross'} Wins`);
                return;
            }
        }
    };
    //

    useEffect(() => {
        checkScore();
    }, [cells]);

    return (
        <div className="ttt-game">
            <h2>Tic Tac Toe Game</h2>
            <div className="tt-board">
                {cells.map((cell, index) => 
                    <Cell 
                        key={index}
                        id={index}
                        cell={cell}
                        go={go}
                        setGo={setGo}
                        cells={cells}
                        setCells={setCells}
                        winMessage={winMessage}
                    />
                )}
            </div>
            <p>{winMessage || msg}</p>

        </div>
    )
}

export default TicTacToe;