import React from "react";

export default class MyApp1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'CamperBot'
        }        
    }
    
    render() {
        return (
            <>
                <Navbar name={this.state.name}/>
            </>
        )
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);        
    }
    render() {
        return (
            <>
                <h1>Hello my name is: {this.props.name}</h1>                
            </>
        )
    }
}

