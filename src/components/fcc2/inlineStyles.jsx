import React from "react";

export default class Colorful extends React.Component {
    render() {
        // NOTE: this is not a global variable, only local to this component
        const styles = {
            color: "purple",
            fontSize: 40,
            border: '2 solid purple'
        };
        return (
            <div>
                {/* React does not accept the kebab-style case keys, use camelCase */}
                <div style={{color: "red", fontSize: '43px'}}>Big Red</div>
            
                {/* try with creating a styles object */}
                <div style={styles}>Style Me!</div>

            </div>
            

        )
    }
}