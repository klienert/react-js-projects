import React, { createContext, useState } from 'react';

const MenuContext = createContext();

const Menu = ( {children} ) => {
    const [open, setOpen] = useState(true)

    const toggle = () => {
        setOpen(prevOpen => !prevOpen);
    }
   
    return (
        <MenuContext.Provider value={{open, toggle}}>
            <div className="nav-bar-menu">
                {children}
            </div>
        </MenuContext.Provider>
    )
}

export default Menu;
export {MenuContext}