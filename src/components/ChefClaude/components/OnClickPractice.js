import React from "react";

const OnClickPractice = () => {

    const handleClick = () => {
        console.log("btn clicked!");
    }
    const handleMouseOver = () => {
        console.log("over the image!");
    }

    return (
        <aside className="onclick-practice-container">
            <img 
                src="https://picsum.photos/640/360" 
                alt="placeholder pic..." 
                onMouseOver={ handleMouseOver }
            />
            <button 
                // onClick={ function() { console.log("clicked!")} }
                onClick={ handleClick }

            >Click Me!</button>
        </aside>
    )
}

export default OnClickPractice;