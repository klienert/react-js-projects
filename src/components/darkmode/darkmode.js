import React, { useState } from "react";
import './styles.css';

const DarkModeToggle = () => {

    const [isDarkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.querySelector('body').setAttribute('data-theme', newMode ? 'dark' : 'light');
            return newMode;
        })
    };

    return (
        <div className="dark-mode-switch">
            <h3>{isDarkMode ? 'Light' : 'Dark'} Mode</h3>
            <label className="switch">
                <input 
                    type="checkbox" 
                    aria-label="Dark Mode Switch"
                    onClick={toggleMode}
                    checked={isDarkMode}
                />
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default DarkModeToggle;