import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { WordleContext } from "./index";

const Keyboard = () => {

    const { onEnter, onDelete, onSelectLetter, disabledLetters, letterCount } = useContext(WordleContext);

    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"], 
        ["A","S","D","F","G","H","J","K","L"], 
        ["Z","X","C","V","B","N","M"]
    ];
    
    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            onEnter();
        } else if (event.key === "Backspace") {
            onDelete();
        } else {
            keys.flat().forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key);
                }
            });
        }
        // console.log(letterCount);
        // console.log(disabledLetters);
    }, [onEnter, onDelete, onSelectLetter, disabledLetters, letterCount]);    

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        }
    }, [handleKeyboard]);

    return (
        <div className="wordle-keyboard" onKeyDown={handleKeyboard}>
            <div className="line1">
                {keys[0].map((key) => {
                    return <Key 
                                key={key} 
                                keyVal={key} 
                                disabled={disabledLetters.includes(key)}
                            />
                })}
            </div>
            <div className="line2">
                {keys[1].map((key) => {
                    return <Key 
                                key={key} 
                                keyVal={key} 
                                disabled={disabledLetters.includes(key)}
                            />
                })}
            </div>
            <div className="line3">
                <Key key={"ENTER"} keyVal={"ENTER"} bigKey/>
                {keys[2].map((key) => {
                    return <Key 
                                key={key} 
                                keyVal={key} 
                                disabled={disabledLetters.includes(key)}
                            />
                })}
                <Key key={"BACKSPACE"} keyVal={"←"} bigKey/>
            </div>
        </div>
    )
}

export default Keyboard;