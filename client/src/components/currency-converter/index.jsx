// https://youtu.be/XN5elYWiSuw?si=c_0MOHLswYpEZgbW

// import React, { useEffect, useState } from "react"
// import "./cc_styles.css";
import data from "./data.json";
// import { useEffect, useState } from "react";

export default function CurrencyConvert() {

    const LIST_QUOTES_URL = 'https://currency-exchange.p.rapidapi.com/listquotes';
    const KEY = '41c8a8d60dmshb45964faf253902p18a23ejsn582fd3e1e5f6';
      
    // useEffect(() => {
    //     fetch(BASE_URL + '?access_key=' + KEY)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             // setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    //         })
                
    // }, [])       

    // const [currencyOptions, setCurrencyOptions] = useState([]);
    // const [fromCurr, setFromCurr] = useState();
    // const [toCurr, setToCurr] = useState();

    const { rates } = data;

    // useEffect(() => {
    //     const firstCurr = Object.keys(data.rates)[0];
    //     setCurrencyOptions(rates);
    //     setFromCurr(data.base);
    //     setToCurr(firstCurr);
    // })
    
    
       
    return (
        <div className="container">
            <h1>Converter</h1>            
            <div className="convert">
                <input type="number" className="input"/>
                <select name="" id="">                    
                    
                </select>
            </div>
            <div className="equals">=</div>
            <div className="convert">
                <input type="number" className="output" />
                <select name="" id="">
                    
                </select>
            </div>            
        </div>
        // Local JSON 
        // <div className="container">
        //     <h1>Converter</h1>            
        //     <div className="convert">
        //         <input type="number" className="input"/>
        //         <select name="" id="">                    
        //             {Object.keys(rates).map(r => (
        //                 <option key={r} value={r}>{r}</option>
        //             ))}
        //         </select>
        //     </div>
        //     <div className="equals">=</div>
        //     <div className="convert">
        //         <input type="number" className="output" />
        //         <select name="" id="">
        //             {Object.keys(rates).map(r => (
        //                 <option key={r} value={r}>{r}</option>
        //             ))}
        //         </select>
        //     </div>            
        // </div>
    );    
}