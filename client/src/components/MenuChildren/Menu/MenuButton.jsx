import React, { useContext } from 'react';
import Button from "../Button/Button";
import { MenuContext } from './Menu';


const MenuButton = ( {children } ) => {

    const {toggle, open} = useContext(MenuContext);    
        
    return (
        <Button onClick={toggle} aria-expanded={open} aria-haspopup="true">{children}</Button>
    )
}

export default MenuButton;