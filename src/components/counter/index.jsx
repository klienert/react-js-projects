import React, { useState } from "react";

export default function Counter() {

    const [count, setCount] = useState(4);
    const incCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    const decCount = () => {
        setCount(prevCount => prevCount - 1)
    }

    const spanClass = () => {
        let res = '';
        if (count > 0) {
            res = 'text-success p-1';
        } else if (count < 0) {
            res = 'text-danger p-1';
        } else {
            res = 'text-primary p-1';
        }        
        return res;
    }

    return <div className="counter">

        <h3>Basic Counter:</h3>

        <button onClick={decCount}> - </button>
        <span className={spanClass()}>{count}</span>        
        <button onClick={incCount}> + </button>
        
    </div>
}