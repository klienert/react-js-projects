import React from "react";

const frontEndFrameworks = [
    'React',
    'Angular', 
    'Ember', 
    'Knockout', 
    'Backbone', 
    'Vue'
];

export default function Frameworks() {
    const renderFrameworks = frontEndFrameworks.map((item, index) => {
        return <li key={index}>{item}</li>
    }); // change this
    return (
        <div>
            <h1>Popular Front End JS Frameworks</h1>
            <ul>
                {renderFrameworks}
            </ul>
        </div>
    );
};