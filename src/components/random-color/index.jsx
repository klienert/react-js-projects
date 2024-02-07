// Random Color Generator

import { useState } from "react";

export default function RandomColor() {    
    
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#000000');

    function randUtil(length) {
        return Math.floor(Math.random() * length);
    }


    function handleRandHex() {
        console.log("Random Hex Color...");
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#";

        for(let i = 0; i < 6; i++) {
            hexColor += hex[randUtil(hex.length)];
        }
        // console.log(hexColor);
    }

    function handleRandRGB() {
        console.log("Random RGB Color...");
    }

    return (
        <div 
            style = {{
                width: "100vw",
                height: "100vh",
                background: color,
            }}
            className="container"
        >
            <button 
                onClick={()=> setTypeOfColor('hex')} 
            >Create HEX Color</button>
            <button 
                onClick={()=> setTypeOfColor('rgb')} 
            >Create RGB Color</button>
            <button onClick={
                typeOfColor === 'hex' 
                ? handleRandHex()
                : handleRandRGB()
                }>Generate Random Color</button>
        </div>
    );
    
}