import React from "react";

const inputStyle = {
    width: 235,
    margin: 5
};

export default class CheckUserAge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''

        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            input: e.target.value,
            userAge: ''
        });
    }
    submit() {
        this.setState(state  => ({
            userAge: state.input
        }));
    }
    render() {
        // button constants
        const btn1 = <button onClick={this.submit}>Submit</button>;
        const btn2 = <button>You May Enter</button>;
        const btn3 = <button>You Shall Not Pass</button>;
        return (
            <div>
                <h3>Enter your age to continue</h3>
                <input 
                    style={inputStyle}
                    type='number'
                    value={this.state.input}
                    onChange={this.handleChange}
                /><br/>
                {/* Add conditional here? */}

            </div>
        )
    }
    
}