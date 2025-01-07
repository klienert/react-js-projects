import React from "react";

const Joke = ({setup, punchline, children}) => {

    return (
        <>
            {setup && <p className="setup">Setup: {setup}</p>}
            <p className="punchline">Punchline: {punchline}</p>
            <p>{children}</p>
            <hr />
        </>
    )
}

export default Joke;