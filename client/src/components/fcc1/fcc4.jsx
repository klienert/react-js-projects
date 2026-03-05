import React from "react";

class App1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Welcome name="Keith"/>
            </div>
        )
    }
}

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>Hello, <strong>{this.props.name}</strong>!</p>
            </div>
        )
    }

}

export default App1;