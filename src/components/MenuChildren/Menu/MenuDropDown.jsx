import React, { useContext } from 'react';
import { MenuContext } from './Menu';

const MenuDropDown = ({ children }) => {

    const { open } = useContext(MenuContext);

    return (
        <>
        {open && 
            <div className="nav-bar-dropdown">
                {children}
            </div>}
        </>
    )
}

export default MenuDropDown;