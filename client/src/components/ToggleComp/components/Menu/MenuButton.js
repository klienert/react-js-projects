import React from "react";
import Button from '../Button/Button';
import Toggle from "../Toggle";


const MenuButton = ({children}) => {

    return (
        <Toggle.Button>
            <Button>{children}</Button>
        </Toggle.Button>
        
    )
}

export default MenuButton;