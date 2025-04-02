import React from 'react';
import Toggle from '../Toggle/index';
import MenuButton from './MenuButton';

const Menu = ({children, onOpen}) => {

    return (
        <Toggle onToggle={() => onOpen()}>
            <div className="toggle-menu">
                {children}
            </div>
        </Toggle>        
    )
}

export default Menu;
