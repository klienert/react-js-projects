import React from "react";

class OnlyEvens extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log("Should I update?");
        if (nextProps.value % 2 === 0) { // even
            console.log(nextProps.value + ' is even');
            return true;
        }else {
            console.log(nextProps.value + ' is odd');
            return false;
        }        
        // return true;
    }
    componentDidUpdate() {
        console.log('Component re-rendered.');
    }

    render() {
        return <h1>{this.props.value}</h1>;
    }
}

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.addValue = this.addValue.bind(this);
    }
    addValue() {
        this.setState(state => ({
            value: state.value + 1
        }));
    }
    render() {
        return (
            <div>
                <button 
                    onClick={this.addValue}
                >Add</button>
                <OnlyEvens value={this.state.value} />
            </div>
        )
    }

}