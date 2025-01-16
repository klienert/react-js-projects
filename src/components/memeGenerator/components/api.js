import React,{ useEffect } from "react";

// returns top 100 memes
const memeUrl = 'https://api.imgflip.com/get_memes';


export const getRandomImage = async () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (setData) => {
            try {
                
            } catch (err) {
                
            }
        }
    })
}