import { useEffect, useState } from "react";

const STORAGE_KEY = 'theme' // 'light' || 'dark'

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        console.log('clicked!');
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    };

    return { theme, setTheme, toggleTheme };
}

export default useTheme;