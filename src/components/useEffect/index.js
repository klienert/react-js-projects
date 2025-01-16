import React, { useState, useEffect } from "react";

const UsingUseEffect = () => {

    const [starWarsData, setStarWarsData] = useState({}); // object
    const [count, setCount] = useState(1);

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json())
            .then(data=>setStarWarsData(data))
    }, [count])

    return (
        <section className="using-effect">
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Get next character</button>
            <pre>
                {JSON.stringify(starWarsData, null, 2)}
            </pre>
        </section>
    )
}

export default UsingUseEffect;