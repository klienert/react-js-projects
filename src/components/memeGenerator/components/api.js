import React, { useState, useEffect } from "react";

// returns top 100 memes
const memeUrl = 'https://api.imgflip.com/get_memes';


<<<<<<< HEAD
export const getRandomImage = async () => {
=======
export async function getRandomImage() {

}

/*
const getRandomImage = () => {
>>>>>>> 3639f12f1731f6c2219a51b0b3255cd2eba4ffa1

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (setData) => {
            try {
                const resp = await fetch(memeUrl);
                const jsonData = await resp.json();
                setData(jsonData);
            } catch (err) {
                console.error('Error fetching API data:' , err);                
            } finally {
                setIsLoading(false);
            }
        };
        fetchData(setData);
    }, []);

    useEffect(() => { }, [data])
}
*/
