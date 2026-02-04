"use client";

import React, { useEffect, useState } from "react";

export default function CounterExample() {
    
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const i = setInterval(() => {
            // console.log('Interval func running...');
            setCount(prev => prev + 1);
        }, 1000);

    }, []);
    
    return ( <div className="container">
            <p>Count is: {count}</p>
    </div>
    );
    
}