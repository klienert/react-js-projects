import React, { useState } from "react";
export default function HookCheck() {

    const [checked, setChecked] = useState(false);
    
    return (<div className="hooks primary">
        <input type="checkbox" 
            value="checked"
            className="form-check-input"
            onChange={() => 
                setChecked((checked) => !checked)
            }
        />
        <p>{checked ? <span className="text-info">checked</span> : <span className="text-danger">not checked</span>}</p>
    </div>)
}