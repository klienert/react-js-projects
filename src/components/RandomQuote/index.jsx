import React from "react";

export default class RandomQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: ''
        }
    }
    render() {
        return(
            <div id="wrapper">
                <div id="quote-box"></div>
                <div class="footer"></div>
            </div>
        )
    }
}