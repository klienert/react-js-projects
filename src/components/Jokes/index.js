import React from "react";
import Joke from "./Joke";
import "./styles.css";
import jokesData from "./jokesData";


const Jokes = () => {
    
    const jokeElements = jokesData.map((joke) => { // a joke object
        return <Joke
                key={joke.id} 
                setup={joke.setup}
                punchline={joke.punchline}                
               ></Joke>
    });

    return (
        <main>
            {jokeElements}
        </main>
    )
}

export default Jokes;