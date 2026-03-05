"use client";

import { useState } from "react";


export default function User() {
    
    const [user, setUser] = useState({name: "", city: "", age: 50});

    const handleChange = (e) => {
        // notice that you are returning an object --> see useState(**) above
        // this just updates the 'name' prop, the ...user fills in the remainder; however the function
        // allows to edit the name only
        setUser(
            {
                ...user,
                name: e.target.value
            });
    }

    console.log(user);
    return (<div className="container">

        <form>
            <input type="text" onChange={handleChange} 
            placeholder="Your Name" />
        </form>

  
    </div>
    );
}
