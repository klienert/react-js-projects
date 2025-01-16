import React, { useState } from "react";
import "./styles.css";
import Die from "./components/Die";

const Tenzies = () => {    
    
    const generateAllNewDice = () => {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: true,
                id: i
            })                
        }
        return arr;
    }

    const [dice, setDice] = useState(generateAllNewDice());
      
    const newDice = dice.map((x) => (
        <Die 
            value={x.value}
            id={x.id}
            isHeld={x.isHeld}
            key={x.id}
        />
    ));

    const rollDice = () => {
        setDice(generateAllNewDice());
    }
    
    return (
        <section className="tenzies-container">
            <h1>Tenzies</h1>
            <div className="tenzies-board">            
                <div className="tenzies-die-grid">
                    {newDice}
                </div>
                <button 
                    className="tenzies-roll-btn"
                    onClick={rollDice}
                >Roll</button>
            </div>
        </section>
    )
}

export default Tenzies;