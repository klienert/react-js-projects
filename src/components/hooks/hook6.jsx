import React, { useState, useEffect, useReducer} from "react";


const Reducer = () => {
    const [number, setNumber] = useReducer((number, newNumber) => number + newNumber, 0);

    return (
        <>        
            <h1>
                {number}
            </h1>
            <button
                onClick={() => setNumber(1)}    
                className="btn btn-primary p-2 m-2"
            >Increase
            </button>
        </>
    )
}

export default Reducer;
