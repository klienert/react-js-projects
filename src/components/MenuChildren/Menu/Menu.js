import React, { useState, Children, cloneElement } from 'react';

const Menu = ( {children} ) => {
    const [open, setOpen] = useState(true)

    const toggle = () => {
        setOpen(prevOpen => !prevOpen);
    }

    return (
        <div className="nav-bar-menu">
            {Children.map(children, (c) => {
                return cloneElement(c, {
                    open,
                    toggle
                })
            })}
        </div>
    )
}

export default Menu;