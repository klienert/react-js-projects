import React from "react";

class MyApp1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'CamperBot'
        }        
    }
    render() {
        return (
            <>
                <Navbar />
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
                <h1>Hello my name is: </h1>
            </>
        )
    }
}

export default MyApp1;