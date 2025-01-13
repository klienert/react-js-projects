import React, { useState } from "react";

const Joke = ({setup, punchline, id}) => {

    const [isShown, setIsShown] = useState(false);

    const toggleShown = () => {
        setIsShown(prevShown => !prevShown);
    }
    
    return (
        <>
            {setup && <p className="setup" key={id}>Setup: {setup}</p>}
            {/* <button 
                onClick={toggleShown}
            >Show Punchline</button>
            <p className="punchline">Punchline: {punchline}</p> */}

            {/* {isShown ? <p className="punchline">Punchline: {punchline}</p> : <button 
                onClick={toggleShown}
            >Show Punchline</button>} */}
            
            {/* Or a better approach */}

            {isShown && <p className="punchline">Punchline: {punchline}</p>}
            <button 
                onClick={toggleShown}
            >{!isShown ? "Show Punchline" : "Hide Punchline"}</button>
            
            <hr />
        </>
    )
}

export default Joke;