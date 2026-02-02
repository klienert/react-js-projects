import React, { useState } from "react";
import Count from "./Count"

export default function State2() {

    const [count, setCount] = useState(0);
    
    const increment = () => {
        setCount(prevCount => prevCount + 1); 
               
    }

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    }

    // console.log('State2 (main) rendered');

    return (
        <section className="state2">
            <h2>Counter</h2>
            <div className="state2-counter">
                <button 
                    className="state2-minus" 
                    aria-label="Decrease count"
                    onClick={decrement}
                >-</button>
                {/* <h2 className="state2-count">{count}</h2> */}
                <Count number={count}/>
                <button 
                    className="state2-plus" 
                    aria-label="Increase count"
                    onClick={increment}
                >+</button>
            </div>
        </section>
    )
}