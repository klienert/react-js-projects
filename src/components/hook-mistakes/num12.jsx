import { useState } from "react";

export default function NewCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        // don't add more of the setCount(), useState sets 'count' as 0
        // setCount(count + 1); // 0 + 1
        // setCount(count + 1); // 0 + 1
        // setCount(count + 1); // 0 + 1
        // instead use the prev =>
        setCount(prev => prev + 1); // increments by 2 // 1 + 1
        setCount(prev => prev + 1); // increments by 3 // 2 + 1
        setCount(prev => prev + 1); // increments by 4 // 3 + 1, etc.
    }
    return ( <div className="container">
            <button
                onClick={handleClick}
                className="btn btn-primary px-4 py-2 text-white rounded"
            >
                Click Me
            </button>
            <p>Count is: {count}</p>
        </div>
    );
}