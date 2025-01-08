import React from "react";
import './styles.css';
import Header from "./components/Header";
import Main from "./components/Main";


const MemeGenerator = () => {

    return (
        <article className="meme-generator">
            <Header />
            <Main />
        </article>
    )
}

export default MemeGenerator;