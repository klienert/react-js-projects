import React, { useState, useEffect} from "react";


const UseEffectHook = () => {
    const [name, setName] = useState("Jan");
    const [admin, setAdmin] = useState(false);
    
    useEffect(() => {
        console.log(`Celebrate ${name}`);
    }, [name]);
    
    useEffect(() => {
        console.log(`The user is: ${admin ? "admin" : "user"}`);
    }, [admin]);

    return (
        <>
            <section>
                <p>Congratulations {name}</p>
                <button
                    onClick={()=> setName("Will")}
                >Change Winner</button>
                <p>{admin ? "Logged IN" : "not logged in"}</p>
                <button
                    onClick={() => setAdmin(true)}>
                    Log In
                </button>
            </section>
        </>        
    )
}

export default UseEffectHook;
