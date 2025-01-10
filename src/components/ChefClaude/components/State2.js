import React, { useState } from "react";

export default function State2() {

    const [count, setCount] = useState(0);
    
    const increment = () => {
        // one way:
        setCount(count + 1); // this does not work with the previous value of count

        // another way (using a callback function);
        setCount(prevCount => prevCount + 1); 
               
    }

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    }

    return (
        <section className="state2">
            <h2>Counter</h2>
            <div className="state2-counter">
                <button 
                    className="state2-minus" 
                    aria-label="Decrease count"
                    onClick={decrement}
                >-</button>
                <h2 className="state2-count">{count}</h2>
                <button 
                    className="state2-plus" 
                    aria-label="Increase count"
                    onClick={increment}
                >+</button>
            </div>
        </section>
    )
}