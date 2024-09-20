import React from "react";

// const TypesOfFruit = () => {
//     return (
//         <div>
//             <h2>Fruits:</h2>
//             <ul>
//                 <li>Apples</li>
//                 <li>Blueberries</li>
//                 <li>Oranges</li>
//                 <li>Strawberries</li>
//                 <li>Bananas</li>
//             </ul>
//         </div>
//     );
// };

const NonCitrus = () => {
    return (
        <div>
            <h4>Non-Citrus:</h4>
            <ul>
                <li>Apples</li>
                <li>Blueberries</li>
                <li>Strawberries</li>
                <li>Bananas</li>
            </ul>
        </div>
    );
};

const Citrus = () => {
    return (
        <div>
            <h4>Citrus:</h4>
            <ul>
                <li>Lemon</li>
                <li>Lime</li>
                <li>Orange</li>
                <li>Grapefruit</li>
            </ul>
        </div>
    )
}

const Fruits = () => {
    return (
        <div>
            <h2>Fruits:</h2>
            <NonCitrus />
            <Citrus />
        </div>
    );
};

const Veggies = () => {
    return (
        <div>
            <ul>
                <li>Brussel Sprouts</li>
                <li>Broccoli</li>
                <li>Squash</li>
            </ul>
        </div>
    )
}

const Vegtables = () => {
    return (
        <div>
            <h2>Vegetables:</h2>
            <Veggies />
            
        </div>
    );
};

class TypesOfFood extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Types of Food:</h1>
                <Fruits />
                <Vegtables />
            </div>
        );
    }
}

export default TypesOfFood;