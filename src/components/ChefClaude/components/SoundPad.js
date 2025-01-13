import { useState } from "react";
import padsData from '../pads';

const SoundPads = () => {
    
    const [pads, setPads] = useState(padsData);

    const buttonElements = pads.map(pad => (
        <button
            key={pad.id}
            className="pad-btn"
        >X
        </button>
    ));

    return (
        <section className="pad">
            <div className="pad-container">
                {buttonElements}
            </div>
        </section>
        
    )
}

export default SoundPads;