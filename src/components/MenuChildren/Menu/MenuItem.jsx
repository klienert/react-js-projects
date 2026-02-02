import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ( {linkTo, linkName} ) => {
    return (
        <Link to={linkTo}>{linkName}</Link>
    )
}

export default MenuItem;