import React, { useState } from "react";

export default function HookBtn() {
    const [
        status, 
        setStatus
    ] = useState(<span className="text-danger">Not Delivered</span>);
    // console.log(status);
    

    return (
        <div className="hooks primary">
            <h1>The package is: {status}</h1>
            <small>Utilizing the useState hook...</small><br/>
            <button className="btn btn-primary m-1 p-2"
                onClick={() => setStatus(<span className="text-success">Delivered</span>)}
            >Deliver</button>
            <button className="btn btn-secondary m-1 p-2"
                onClick={() => setStatus(<span className="text-danger">Not Delivered</span>)}
            >Reset</button>
        </div>
    )
}