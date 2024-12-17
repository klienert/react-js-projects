import React, { useState } from "react";
import './styles.css';

const DarkModeToggle = () => {

    const [isDarkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!isDarkMode);
        if (isDarkMode) { // checked
            document.querySelector('body').setAttribute('data-theme', 'dark');
        } else {
            document.querySelector('body').setAttribute('data-theme', 'light');
            
            
        }
    };

    return (
        <div className="darkMode">
            <h3>{isDarkMode ? 'Light' : 'Dark'} Mode</h3>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>                
            </label>
            {/* <div className="darkModeSwitch">
                <button 
                    className="switch-btn" 
                    type="checkbox" 
                    aria-label="Dark Mode"
                    onClick={toggleMode}                    
                >
                    <span className="switch-knob"></span>
            </button> 
        </div> */}
        </div>
        
    )
}

export default DarkModeToggle;