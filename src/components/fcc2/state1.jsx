import React from "react";

class StatefulComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Hello'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            text: "You Clicked!"
        })

    }
    render() {
        // you can do other JS functions, computations, etc. here
        const name = this.state.text;

        return (
            <div>
                <button onClick={this.handleClick}>Click Me</button>
                <h1>{name}</h1>
            </div>
        )
    }
}

export default StatefulComponent;