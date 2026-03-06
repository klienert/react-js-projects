import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = 'theme';
const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {}
});

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        const prefersDark = typeof window !== 'undefined' && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () =>  {
        console.log('clicked?');
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
export const useThemeContext = () => useContext(ThemeContext);