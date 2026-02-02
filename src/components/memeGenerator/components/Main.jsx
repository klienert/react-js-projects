import { useState, useEffect } from "react";
import GetImage from "./GetImage";

const Main = () => {

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "walk into mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(resp => resp.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    const handleChange = (e) => {
        const {value, name} = e.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    const getRandomMeme = () => {
        // console.log(allMemes[Math.floor(Math.random() * allMemes.length)].url);
        setMeme(prevImage => ({
            ...prevImage,
            imageUrl: allMemes[Math.floor(Math.random() * allMemes.length)].url
        }))
    }

    return (
        <aside className="meme-gen-main">
            <div className="meme-gen-form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>
                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button
                    onClick={getRandomMeme}
                >Get a new meme image 🖼</button>
            </div>
            <div className="meme-gen-meme">
                <img src={meme.imageUrl} alt="meme image" />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </aside>
    )
}

export default Main;