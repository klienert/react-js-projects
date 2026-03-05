import React, { useState, useRef } from "react";

export default function Counter() {

    // const [count, setCount] = useState(4);
    const t = 5;
    const count = useRef(4);
    const [rerender, setRerender] = useState(false);

    const incCount = () => {
        // setCount(prevCount => prevCount + 1)
        count.current++;
    }

    const decCount = () => {
        // setCount(prevCount => prevCount - 1)
        count.current--;
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
        <button onClick={() => {
            rerender ? setRerender(false) : setRerender(true)}}
        >Re-Render</button>
        <button onClick={decCount}> - </button>
        <span className={spanClass()}>{count.current}</span>        
        <button onClick={incCount}> + </button>
        
    </div>
}