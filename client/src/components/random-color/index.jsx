// Random Color Generator

import { useEffect, useState } from "react";

export default function RandomColor() {    
    
    const [typeOfColor, setTypeOfColor] = useState("hex");
    const [color, setColor] = useState("#000000");

    function randUtil(length) {
        return Math.floor(Math.random() * length);
    }

    function randomHexColor() {
        // console.log("Random Hex Color...");
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#";

        for(let i = 0; i < 6; i++) {
            hexColor += hex[randUtil(hex.length)];
        }
        // console.log(hexColor);
        setColor(hexColor);
    }

    function randomRGBColor() {
        const r = randUtil(256);
        const g = randUtil(256);
        const b = randUtil(256);

        // console.log("Random RGB");
        setColor(`rgb(${r}, ${g}, ${b}`);        
    }

    useEffect(() => {
        if (typeOfColor === 'rgb') {
            randomRGBColor();
        } else {
            randomHexColor();
        } 
    }, [typeOfColor]);

    return (
        <div 
            style = {{
                width: "100vw",
                height: "100vh",
                background: color
            }}
            className="randColor"
        >
            <button onClick={()=> setTypeOfColor('hex')}>Create HEX Color</button>
            <button onClick={()=> setTypeOfColor('rgb')}>Create RGB Color</button>
            <button 
                onClick={
                    typeOfColor === 'hex' 
                    ? randomHexColor
                    : randomRGBColor
                }
            >Generate Random Color</button>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center", 
                    alignItems: "center",
                    colors: "#FFF",
                    fontSize: "60px",
                    marginTop: "50px",
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <h3>{typeOfColor === 'rgb' ? "RGB Color" : "HEX Color"}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    );
    
}