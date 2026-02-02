import { useState } from "react";
import padsData from '../pads';
import Pad from "./Pad";

const SoundPads = ( {darkMode} ) => {
    
    const [pads, setPads] = useState(padsData);
    
    const toggle = (id) => {
        setPads(prevPads => prevPads.map(item =>{
            return item.id === id ? {...item, on: !item.on} : item
        }));
    }
    
    const buttonElements = pads.map(pad => (
        <Pad
            key={pad.id}
            color={pad.color}  
            on={pad.on}
            id={pad.id}
            toggle={toggle}
        />
    ));

    return (
        <section className="pad">
            <div className="pad-container">
                {buttonElements}
            </div>            
            {/* <button 
                className="all-off"
                onClick={toggle}
            >Turn all Off</button> */}
        </section>
        
        
    )
}

export default SoundPads;