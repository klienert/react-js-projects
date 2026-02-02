import React, { useState, createContext } from 'react';
import Header from "./Header";
import Button from "./Button";
import './styles.css';

const ThemeContext = createContext();

const ThemeExample = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }
    
    const contextValue = {
        theme, 
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={`theme-container ${theme}-theme`}>
                <Header />
                <Button />
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeExample;
export { ThemeContext } 