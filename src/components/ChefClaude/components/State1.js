import React from "react";

const State1 = () => {

    /*
    const state = React.useState("Yes"); // you are returning an array
    --- want to call the value? Need to specify the element in the array
    console.log(state);
    */

    // destructure the array
    const [result, setResult] = React.useState("Yes");
    // setResult("Heck Yes!");

    const handleClick = () => {
        return setResult('Definitely');
    }

    return (
        <div className="state1">
            <h1 className="state1-title">Is state important to know?</h1>
            <button 
                onClick={handleClick} 
                className="state1-value"
            >{result}</button>
        </div>
    )
}

export default State1;