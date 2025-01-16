import { useState } from 'react';
import WindowTracker from "./WindowTracker";


const WindowEffect = () => {

    const [show, setShow] = useState(true);

    return (
        <section className="window-tracker-container">
            <button 
                onClick={() => setShow(prevShow => !prevShow)}
            >Toggle WindowTracker</button>
            {show && <WindowTracker />}
        </section>
    )
}

export default WindowEffect;
