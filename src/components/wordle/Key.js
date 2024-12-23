import React, { useContext } from "react";
import { AppContext } from "./index";

const Key = ({ keyVal, bigKey, disabled, correct  }) => {
    const { onDelete, onSelectLetter, onEnter  } = useContext(AppContext);

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
        } else if (correct ) {
            return "key correct";        
        } else {
            return "key";
        }
    }
    let className1 = setClass();


    return <div 
        className={className1}
        // data-key={keyVal}
        onClick={selectLetter}
    >{keyVal}</div>
}

export default Key;