import React, { useContext } from "react";
import { ThemeContext } from './index';

const Header = () => {
    const value = useContext(ThemeContext);
    const classTheme = value.theme;
    const text = value.theme[0].toUpperCase() + value.theme.slice(1);

    return (
        <header className={`${classTheme}-theme`}>
            <h1>{text} Theme</h1>
        </header>
    )
}

export default Header;