import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Die from "./components/Die";
import Confetti from 'react-confetti';

const Tenzies = () => {
    
    const generateAllNewDice = () => {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: i
            })                
        }
        return arr;
    }

    const [dice, setDice] = useState(() => generateAllNewDice());
    
    const gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value);

    const handleHold = (id) => {
        setDice(prevDie => prevDie.map(x => {
            return x.id === id ? 
                {...x, isHeld: !x.isHeld} : 
                x
        }))
    }
      
    const newDice = dice.map((x) => (
        <Die 
            value={x.value}
            id={x.id}
            isHeld={x.isHeld}
            key={x.id}
            hold={handleHold}
        />
    ));

    const rollDice = () => {
        if (gameWon) {
            setDice(generateAllNewDice());
        } else {
            setDice(prevDie => prevDie.map(x => {
                return x.isHeld === false ?
                    {...x, value: (Math.ceil(Math.random() * 6))} :
                    x
            }));
        }
    }

    const newGameRef = useRef(null);
    useEffect(() => {
        if (gameWon) {
            newGameRef.current.focus();
        }
    }, [gameWon])
    
    return (
        <section className="tenzies-container">
            {gameWon && <Confetti />}
            <div aria-live='polite' className="tenzies-sr-only">
                {gameWon && <p>Congratuations! You won! Press "New Game" to start again.</p>}
            </div>
            <div className="tenzies-board">
                <h1 className="tenzies-title">Tenzies</h1>
                <p className="tenzies-instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="tenzies-die-grid">
                    {newDice}
                </div>
                <button 
                    className="tenzies-roll-btn"
                    onClick={rollDice}
                    ref={newGameRef}
                >{gameWon ? 'New Game' : 'Roll'}</button>
            </div>
        </section>
    )
}

export default Tenzies;