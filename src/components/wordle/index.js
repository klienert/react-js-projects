//  https://youtu.be/WDTNwmXUz2c?si=4OaHhETM3SvczXFw


import './newStyles.css';
import Board from "./Board";
import Keyboard from "./Keyboard";
import { boardDefault } from "./Words";
import React, { useState, createContext } from "react";

export const AppContext = createContext();

function Wordle () {

    const [board, setBoard] = useState(boardDefault);

    return (
        <div>        
            <div className="wordle-nav">
                <h1>Wordle</h1>
            </div>
            <AppContext.Provider 
                value={
                    { board }
                }
            >
                <div className="game">
                    <Board />
                    <Keyboard />
                </div>
            </AppContext.Provider>
        </div>
    )
}

export default Wordle;