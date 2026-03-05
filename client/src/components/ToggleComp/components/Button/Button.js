import React from 'react';
import classnames from "classnames"

const Button = ({ children, className, size, variant, ...rest }) => {
    let sizeClass = size && `button-${size}`;
    let variantClass = variant && `button-${variant}`
    const allClasses = classnames(sizeClass, variantClass, className)

    return (
        <button className={allClasses} {...rest}>
            {children}
        </button>
    )
}

export default Button;