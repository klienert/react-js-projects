import React from "react";

export default class Counter extends React.Component {

    constructor (props) {
        console.log('Constructor');
        super(props)
        this.state = {
            counter: 0
        }
    }

    render () {
        console.log('render');
        return 
        <div>
            <div className="counter">
                Counter: {this.state.counter}
            </div>
        </div>
    }
}