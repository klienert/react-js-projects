import React, { useContext } from "react";
import { WordleContext } from "./index";

const Key = ({ keyVal, bigKey, disabled, present, correct }) => {
    const { 
        onDelete, 
        // disabledLetters,
        // presentLetters,
        // correctLetters,
        onSelectLetter,
        onEnter  } = useContext(WordleContext);
   

    const selectLetter = () => {
        if (disabled) return;

        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "←") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    }

    const setClass = () => {
        if (bigKey) return "key big"; // ENTER and BACKSPACE keys
        if (disabled) return "key absent";
        if (correct) return "key correct";
        if (present) return "key present";
        return "key"; 
    }
    let className1 = setClass();


    return <button 
        className={className1}
        onClick={selectLetter}
        disabled={disabled}
    >{keyVal}</button>
}

export default Key;