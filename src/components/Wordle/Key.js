import React, { useContext } from "react";
import { WordleContext } from "./index";

const Key = ({ keyVal, bigKey, absent, present, correct }) => {
    const { onDelete, onSelectLetter, onEnter  } = useContext(WordleContext);

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "←") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    }

    const setClass = () => {
        if (bigKey) { // ENTER and BACKSPACE keys
            return "key big";
        } else if (absent) { 
            return "key absent";
        } else if (correct) {
            return "key correct";
        } else if (present) {
            return "key present";
        } else {
            return "key";
        }
    }
    let className1 = setClass();


    return <div 
        className={className1}
        onClick={selectLetter}
    >{keyVal}</div>
}

export default Key;