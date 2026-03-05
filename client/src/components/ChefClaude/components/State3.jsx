import React, { useState } from "react";

const State3 = () => {

    const [ myFavThings, setMyFavThings ] = useState([]);
    
    const allFavoriteThings = ["💦🌹", "😺", "💡🫖", "🔥🧤", "🟤🎁", "🐴", "🍎🥧", "🚪🔔", "🛷🔔", "🥩🍝"];

    const thingsElements = myFavThings.map(thing => <p key={thing}>{thing}</p>);
    
    const addFavoriteThing = () => {
        setMyFavThings(
                prevFavThings => [
                    ...prevFavThings, 
                    allFavoriteThings[prevFavThings.length]
                ]
            );
    }

    return (
        <div className="state3">
            <button 
                onClick={addFavoriteThing}
            >Add Item
            </button>
            <section aria-live="polite">
                {thingsElements}
            </section>

        </div>
    )
}

export default State3;