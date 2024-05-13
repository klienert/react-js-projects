import React, {useState} from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({total= 5}) => {
    const [selectedStars, setSelectedStars] = useState(0);

    const createArray = (len) => [
        ...Array(len)
    ];
      
    const Star = ({selected = false, onSelect }) => {
        return (
            <FaStar 
                color={selected ? "red" : "gray"}
                onClick={onSelect}
            />            
        )
    }

    return (
        <>
            <div className="hooks primary">
                {createArray(total).map((n, i) => (
                    <Star
                        key={i}
                        selected={selectedStars > i}
                        onSelect={() => setSelectedStars(i + 1)}
                    />
                ))}                
                <p>{selectedStars} of {total}</p>
            </div>            
        </>        
    )
}

export default StarRating;
