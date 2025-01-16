import React from "react";
import "./styles.css";
import Die from "./components/Die";

const Tenzies = () => {

    return (
        <section className="tenzies-container">
            <div className="tenzies-board">
                <div className="tenzies-die-grid">
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>
                    <Die value={1}/>                    
                </div>
            </div>
        </section>

    )

}

export default Tenzies;