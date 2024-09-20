import React from "react";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>What date is it?</h3>
                <CurrentDate />
            </div>
        )
    }
}

const CurrentDate = (props) => {
    return (
        <div>
            <p>The current date is: </p>
        </div>
    )
}

export default Calendar;