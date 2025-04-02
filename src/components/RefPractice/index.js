import React, { useState, useEffect, useRef } from 'react';
import "./style.css";

const RefPractice = () => {
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const inputRef = useRef(null);

    // handler functions
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();        
        if (!text) {
            return;
        }

        setList(prevList => [...prevList, text])
        setText("")
        inputRef.current.focus()
    }

    return (
        <section className='refPractice-container'>
        <h2>Project List (ideas)</h2>
        <form onSubmit={handleSubmit}>
            <input  
                type="text"
                onChange={handleChange}
                value={text}
                placeholder='Idea'
                ref={inputRef}
            />
            <button>Submit</button>
        </form>

        <ol>
            {list.map((item, i) => 
                <li key={i}>{item}</li>)}
        </ol>
        </section>
    )
}

export default RefPractice;
