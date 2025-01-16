import { useState, useEffect } from "react";
const WindowTracker = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {    
        
        const watchWindowWidth = () => {
            console.log('resized');
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', watchWindowWidth)
        return () => {
            console.log('remove Event Listener()...');
            window.removeEventListener('resize', watchWindowWidth)
        }
    }, []);

    return (
        <h1>Window width: {windowWidth}</h1>
    )
}

export default WindowTracker;