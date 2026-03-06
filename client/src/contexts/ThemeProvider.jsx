import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = 'theme';
const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {}
});

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // default to saved value or system preference
        const saved = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// export const useThemeContext = () => useContext(ThemeContext);
export const useThemeContext = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new ErrorI('useThemeContext must be used within a ThemeProvider...');
    return ctx;
}