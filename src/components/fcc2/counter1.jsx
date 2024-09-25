import React from "react";

class FCC_Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        // Change code below
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
        // Change code above    
    }
    // Change code below    
    increment() {
        this.setState(state => {
            let cnt = state.count;
            return { count: cnt + 1 };
        });        
    }
    
    decrement() {        
        this.setState(state => {
            let cnt = state.count;
            return { count: cnt - 1};
        })
    }

    reset() {        
        this.setState(state => {            
            return { count: 0 };            
        })
    }
    // Change code above
    render() {
        return (
            <>
                <h2 className="text-center text-primary">Counter Example:</h2>
                <button className="inc" onClick={this.increment}>Increment!</button>
                <button className="dec" onClick={this.decrement}>Decrement!</button>
                <button className="reset" onClick={this.reset}>Reset</button>
                <hr></hr>
                
                <h3>Current Count: {this.state.count}</h3>
            </>
        )
    }
}

export default FCC_Counter;