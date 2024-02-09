// primitive v. non-primitives

"use client";

import { useEffect, useState } from "react";

export default function Price() {
    
    
    const [price, setPrice] = useState(0);

    const handleClick = () => {
        setPrice(0);
    }


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
