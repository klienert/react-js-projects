"use client";

import { useEffect, useState } from "react";

const PRICE_PER_ITEM = 5;

export default function Cart() {
    
    // Too much, can be simpler (commented out what is not necessary)
    // If you can get it done without creating new states (use the state you currently have)... do it

    const [quantity, setQuantity] = useState(1);
    // const [totalPrice, setTotalPrice] = useState();
    // new (simpler)
    const totalPrice = quantity * PRICE_PER_ITEM; // this handles it just a easy as with the useEffect(())

    const handleClick = () => {
        setQuantity(quantity + 1);        
    }
    
    // not necessary....
    // useEffect(() => {
    //     setTotalPrice(quantity * PRICE_PER_ITEM);        
    // }, [quantity]);

    return (<div className="container">
            <button 
                onClick={handleClick}                
                className="btn btn-primary px-4 py-2"                
            >
                Add 1 Item
            </button>
        <p>Total price: ${totalPrice}</p>
  
    </div>
    );
}
