import React from "react";
import Header from "./components/Header";
import Entry from "./components/Entry";
import "./styles.css";

const TravelJournal = () => {

    return (
        <div className="travel-journal-container">            
            <Header />            
            <Entry />            
        </div>
    )
}

export default TravelJournal;