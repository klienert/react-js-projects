import React from "react";

export default class MyApp2 extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState = ({
            inputValue: e.target.value
        });
    }
    
    render() {
        return (
            <div>
                <GetInput 
                    input={this.state.inputValue}
                    handleChange={this.handleChange}
                />
                <RenderInput 
                    input={this.state.inputValue}
                />
            </div>
        )
    }
}

class GetInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>
                    <label htmlFor='myInput' name='myInput'>Get Input:</label>
                </h3>                
                <input 
                    id="myInput"
                    value={this.props.input}
                    onChange={this.props.handleChange}
                />
            </div>
        )
    }
}

class RenderInput extends React.Component {
    constructor(props) {
        super(props);       
    }
    render() {
        return(
            <div>
                <h3>Input Render:</h3>
                <p>{this.props.input}</p>
            </div>
        )
    }
}