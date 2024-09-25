import React from "react";

class ControlledInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        // Change code below
        this.handleChange = this.handleChange.bind(this);
        // Change code above    
    }
    // Change code below
    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }
    // Change code above    
    render() {
        return (
            <div>
                <label htmlFor="myInput">Input Here:</label><br/>
                <input id="myInput" name="myInput" value={this.state.input} onChange={this.handleChange}></input>
                <h4>Controlled Input:</h4>
                <p>{this.state.input}</p>
            </div>
        )
    }
}

export default ControlledInput;