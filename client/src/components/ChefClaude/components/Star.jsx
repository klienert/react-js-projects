import React from "react";
import starFilled from "../images/starFilled.svg";
import starEmpty from "../images/starEmpty.svg";

const Star = ( {isFilled, handleClick} ) => {
    let starIcon = (isFilled ? starFilled : starEmpty);
    // console.log("Star Component rendered: " + isFilled);
    return (
        <button
            onClick={handleClick}
            aria-pressed={isFilled}
            aria-label={isFilled ? 'Remove from favorites' : 'Add to favorites'}
            className="favorite-button"
        >
            <img
                src={starIcon}
                alt={isFilled ? "filled star icon" : "empty star icon"} 
                className="favorite"
            />
        </button>
    )
}

export default Star