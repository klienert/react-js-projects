import React, { useContext } from "react";
import { WordleContext } from "./index";

const Key = ({ keyVal, bigKey, disabled, correct, almost }) => {
    const { onDelete, onSelectLetter, onEnter } = useContext(WordleContext);

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
        if (bigKey) {
            return "key big";
        } else if (disabled) {
            return "key disabled";
        } else if (correct) {
            return "key correct";        
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