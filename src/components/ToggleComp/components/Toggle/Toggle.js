import React, { useState, createContext, useEffect, useRef } from 'react';
import useEffectOnUpdate from '../../hooks/useEffectOnUpdate';

const ToggleContext = createContext();

const Toggle = ({ children, onToggle = () => {} }) => {    
    const [on, setOn] = useState(false);

    // use the new custom hook -- useEffectOnUpdate

    

    // const firstRender = useRef(true);
    const toggle = () => { 
        setOn(prevOn => !prevOn)
    };

    // useEffect(() => {
    //     if (firstRender.current) {
    //         firstRender.current = false;
    //     }
    //     onToggle();
    // },[on]);

    useEffectOnUpdate(onToggle, [on]); 

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}

export default Toggle;
export { ToggleContext };


