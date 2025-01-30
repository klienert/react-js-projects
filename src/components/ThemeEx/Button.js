import { ThemeContext } from './index';
import React,{useContext} from 'react';

const Button = () => {
    const value = useContext(ThemeContext);

    return (
        <button 
            className={`${value.theme}-theme`}
            onClick={value.toggleTheme}
        >Switch Theme</button>
    )
}

export default Button;