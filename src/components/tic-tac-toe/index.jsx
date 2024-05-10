// tic-tac-toe
import { useState } from "react";
import Board from "./board.jsx";
import Info from "./info.jsx";

/**
 * https://www.geeksforgeeks.org/how-to-build-a-tic-tac-toe-game-using-react-hooks/
 */

export default function TicTacToe() {

    // create a reset state, indicates whether the game should be reset or not
    const [reset, setReset] = useState(false);

    const [winner, setWinner] = useState("");

    const resetBoard = () => {
        setReset(true);
    };
    
  
    return (
        <div className="ttt">
            {/* Shrinks the popup when there is no winner */}
            <div   
                className={`winner ${
                    winner !== "" ? "" : "shrink"

                }`}
            >
                {/* Display the current winner */}
                <div className="winner-text">{winner}</div>
                {/* button used to reset the board */}
                <button onClick={() => resetBoard()}>
                    Reset Board
                </button>
            </div>
            {/* Custom made board component comprising of the ttt board */}
            <Board
                reset={reset}
                setReset={setReset}
                winner={winner}
                setWinner={setWinner}
            />
            <Info />                
        </div>
    );
}