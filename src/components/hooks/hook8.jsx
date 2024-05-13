import React, { useRef } from "react";

export default function Colors() {

    const sound = useRef();
    const color = useRef();

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form>
                <input 
                    ref={sound} 
                    type="text" 
                    placeholder="Sound..."
                />
                <input ref={color} type="color" />
                <button>ADD</button>
            </form>
        </>
    )
    
}