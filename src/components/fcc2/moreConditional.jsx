import React from "react";

export default class MoreConditional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true
        }
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    toggleDisplay() {
        this.setState(state => ({
            display: !state.display
        }));
    }
    render() {
        // instead of using a traditional if/else, use a {condition && <markup>}
        return (
            <div>
                <button onClick={this.toggleDisplay}>Toggle Me!</button>
                {this.state.display && <h1>Displayed!</h1>}
                {/* Notice that you can put code, conditional logic AND HTML inside the {} */}
            </div>
        )
    }

}