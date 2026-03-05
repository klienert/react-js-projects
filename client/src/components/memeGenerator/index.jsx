import React, { useState, useEffect } from "react";
import './styles.css';
import Header from "./components/Header";
import Main from "./components/Main";
import WindowEffect from "./components/WindowEffect";
import WindowTracker from "./components/WindowTracker";

const MemeGenerator = () => {

    

    return (
        <article className="meme-generator">
            <Header />
            <Main />
            {/* <WindowEffect /> */}
        </article>
    )
}

export default MemeGenerator;