import React from "react";
import Key from "./Key";

const Keyboard = () => {

    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"], 
        ["A","S","D","F","G","H","J","K","L"], 
        ["↵","Z","X","C","V","B","N","M","←"]
    ];

    

    return (
        <div className="wordle-keyboard">
            <div className="line1">
                {keys[0].map((key) => {
                    return <Key keyVal={key}/>
                })}
            </div>
            <div className="line2">
                {keys[1].map((key) => {
                    return <Key keyVal={key}/>
                })}
            </div>
            <div className="line3">
                {keys[2].map((key) => {
                    return <Key keyVal={key}/>
                })}
            </div>
        </div>
    )
}

export default Keyboard;

const keys = [
    
]