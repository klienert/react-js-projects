import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ( {linkTo, linkName} ) => {
    return (
        // <div className="nav-bar-menu-item">        
        //     {children}
        // </div>

        <Link to={linkTo}>{linkName}</Link>
    )
}

export default MenuItem;