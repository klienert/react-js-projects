import React from "react";

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            submit: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
    }

    handleSubmit(e) {        
        // Change code below
        e.preventDefault();
        this.setState({
            submit: this.state.input,
            input: ''
        })
        // Change code above
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {/* Change code below */}
                    <label htmlFor="myInput">Input Here:</label><br/>
                    <input 
                        id="myInput" 
                        name="myInput" 
                        value={this.state.input} 
                        onChange={this.handleChange} 
                    />
                    {/* Change code above */}

                    <button type="submit">Submit!</button>
                </form>

                {/* Change code below */}
                <p>Submitted: <em>{this.state.submit}</em></p>
                {/* Change code above */}
            </div>
        )
    }
}

export default MyForm;