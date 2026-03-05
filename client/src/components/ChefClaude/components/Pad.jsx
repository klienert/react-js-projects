import React, { useState } from "react";

const Pad = ( {color, on, toggle, id} ) => {

    // const [onBtn, setOnBtn] = useState(on);
    
    return (
        <button
            style={{backgroundColor: color}}            
            className={on ? "pad-btn" : "pad-btn on"}
            onClick={()=> toggle(id)}
        >X
        </button>
    )
}

export default Pad;