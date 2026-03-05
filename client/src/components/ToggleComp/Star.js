import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const Star = () => {
    const [ starred, setStarred ] = useState(false);

    const toggle = () => { 
        setStarred(prev => !prev);
    }

    return (
        starred ? 
        <BsStarFill className="toggle-star filled" onClick={toggle} /> :
        <BsStar className="toggle-star " onClick={toggle} />
    )
}

export default Star;