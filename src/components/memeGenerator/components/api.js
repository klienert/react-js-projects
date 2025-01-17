import React, { useState, useEffect } from "react";

// returns top 100 memes
const memeUrl = 'https://api.imgflip.com/get_memes';


export async function getRandomImage() {

}

/*
const getRandomImage = () => {

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
