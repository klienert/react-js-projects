import React, { useState } from "react";

const TernaryPractice = () => {

    const [ isGoingOut, setIsGoingOut ] = useState(true);
    
    const handleClick = () => {
        // if (isGoingOut ? setIsGoingOut(false) : setIsGoingOut(true)); // this is one way, the other is to use a callback function
        return setIsGoingOut(!isGoingOut);
    }

    return (
        <div className="t-practice">
            <h1 className="t-practice-title">Do I feel like going out tonight?</h1>
            <button 
                className="t-practice-value"
                onClick={handleClick}
                aria-label={`Current answer is ${isGoingOut ? "Yes" : "No"}. Click to change it.`}
            >{isGoingOut ? 'Yes' : 'No'}</button>
        </div>

    )
}

export default TernaryPractice;

