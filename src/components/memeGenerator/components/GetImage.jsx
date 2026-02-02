import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetImage = () => {


    const [memeArr, setMemeArr] = useState([]);
    const [image, setImage] = useState("");
    const [loading , setLoading] = useState(true);

    // returns top 100 memes
    const memeUrl = 'https://api.imgflip.com/get_memes';

    console.log("Rendered!");

    fetch(memeUrl) 
        .then(res => res.json())
        .then(data => setMemeArr)



    {/* 
        useEffect(() => {
        axios.get(memeUrl)
            .then((resp) => {
                // console.log(resp.data.data.memes);
                setMemeArr(resp.data.data.memes);
                setLoading(false);

            })
            .catch((err) => {
                console.error('Error fetching API image:', err);
            });
        }, []);

        const getImage = () => {
            if (memeArr.length > 0) {
                setImage(memeArr[Math.floor(Math.random() * memeArr.length)]);
            }
        }
    */}
    


    return (
        <>
            {/* 
            <img src="http://i.imgflip.com/1bij.jpg" alt="meme image" />
            <span className="top">One does not simply</span>
            <span className="bottom">walk into mordor</span>
            */}
            <pre>{JSON.stringify(memeArr, null, 2)}</pre>

        </>
    )
}

export default GetImage;