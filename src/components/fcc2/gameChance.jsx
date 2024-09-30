import React from "react";

class Results extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Change code below this line
        return (
            <h1> { (this.props.fiftyFifty === true) ? 'You Win' : 'You Lose' } </h1>
        )
        // change code above this line
    }
}

export default class GameOfChance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => {
            // complete the return statement            
            return {
                ...prevState,
                counter: prevState.counter + 1
            }
        });
    }
    render() {
        const expression = Math.random() >= .5; // change this line
        
        return (
            <div>
                <button onClick={this.handleClick}>Play Again</button>
                {/* Change below this line */}
                <Results fiftyFifty={expression}/>
                {/* Change above this line */}
                <p>{'Turn: ' + this.state.counter}</p>
            </div>
        );
    }
}