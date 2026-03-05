"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(1900);
    
    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowSizeChange);

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        }
    }, []);

    return windowSize;
}


export default function ExampleComponent1() {
    const windowSize = useWindowSize();
    return (
        <div>Componenet 1</div>
    )
}

export function ExampleComponent2() {
    // instead of copying the above comp1 material to comp2, use a custom hook
    const windowSize = useWindowSize();
    return (
        <div>Componenet 2</div>
    )
}

