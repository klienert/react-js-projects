import React from "react";

const textAreaStyles = {
    width: 235,
    margin: 5
}

export default class MyToDoList extends React.Component {
    constructor(props) {
        super(props);
        // alter below
        this.state = {
            toDoList: [],
            userInput: ''
        }

        // alter above
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        const itemsArray = this.state.userInput.split(',');
        this.setState({
            toDoList: itemsArray
        });
    }
    handleChange(e) {
        this.setState({
            userInput: e.target.value
        });        
    }
    render() {
        const items = this.state.toDoList.map(v => <li>{v}</li>); // change this
        return (
            <div>
                <textarea
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    style={textAreaStyles}
                    placeholder="Separate Items with Commas"
                />
                <br/>
                <button onClick={this.handleSubmit}>Create List</button>
                <h1>My "To Do" List:</h1>
                <ul>{items}</ul>
            </div>
        )
    }
}