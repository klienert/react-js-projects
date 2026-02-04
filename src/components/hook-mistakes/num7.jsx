// primitive v. non-primitives

// Objects are passed by reference... 
// Numbers, strings, booleans, null, and undefined are passed by value

"use client";

import { useEffect, useState } from "react";

export default function Price() {
    // console.log('component rendering...' );
    
    // objects are passed by reference, so it will re-render
    const [price, setPrice] = useState({
        number: 100,
        totalPrice: true
    });

    const handleClick = () => {
        setPrice({
            number: 100, 
            totalPrice: true,
        });
    }

    // could use this, need to look at how this works further...
    // useEffect(() => {

    // }, [price.number]);

    return (<div className="container">
        <button
            onClick={handleClick}
            className="btn btn-primary py-2 px-4 rounded"
        >
            Click me
        </button>

    </div>
    );
}
