"use client";
import { useEffect, useState } from "react";

/*
export default function ProductCard( {id} ) {
    if (!id) {
        return "No id provided"; // component stops here, because of 'return' keyword
    }

    const [something, setSomething] = useState('blah'); 
    // React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.

    useEffect(() => {

    }, [something]);

    return (
        <div className="container">
  
        </div>
    );
}
*/

export default function ProductCard ({id}) {
    const [something, setSomething] = useState('blah'); 
    
    useEffect(() => {}, [something]);

    // if (!id) {
    //     return "No id provided";
    // }

    // better to have just one return keyword...
    return (
        <div className="container">
            {!id 
                ? "No id Provided"
            : {
                /* product card... */
            }}
        </div>
    );

}