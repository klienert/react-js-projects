// single selection
// multiple selection

import { useState } from "react";
import data from "./data";
// import "./styles.css";

export default function Accordian() {
    
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {        
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId) {        
        let cpyMultiple = [...multiple];
        const findIndexCurrId = cpyMultiple.indexOf(getCurrentId);
        if (findIndexCurrId === -1) {
            cpyMultiple.push(getCurrentId);         
        } else {
            cpyMultiple.splice(findIndexCurrId, 1);
        }
        setMultiple(cpyMultiple);
    }

    // console.log(selected, multiple);

    return (
        <div className="acc-wrapper">
            <button
                onClick={()=> setEnableMultiSelection(!enableMultiSelection)}
            >Enable Multi Selection</button>
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item">                            
                            <div 
                                onClick={ enableMultiSelection 
                                    ? () => handleMultiSelection(dataItem.id) 
                                    : () => handleSingleSelection(dataItem.id)
                                }
                                className="title"
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {/* test */}
                            {enableMultiSelection 
                                ? multiple.indexOf(dataItem.id) !== -1 && (
                                    <div className="content">{ dataItem.answer }</div>
                                )
                                : selected === dataItem.id && (
                                    <div className="content">{ dataItem.answer }</div>
                                )
                            }
                                
                            {/*  
                            {
                                 selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                                     <div className="content">{ dataItem.answer }</div>
                                 ) : null
                            }
                            */}
                        </div>
                    ))
                ) : (
                  <div>No Data Found!</div>      
                )}
            </div>
        </div>   
    );
}