import React from 'react';
import Toggle from '../Toggle';
import Menu from './index';

const MenuDropdown = ({ children }) => {
    
    return (
        <Toggle.On>
            <div className='menu-dropdown'>
                {children}
            </div>    
        </Toggle.On> 
        
    )
}

export default MenuDropdown;