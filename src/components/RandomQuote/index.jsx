import React from "react";
import './styles.css';
import axios from "axios";

export default class RandomQuoteGenerator extends React.Component {    
    state = {
        quote: '',
        author: ''
    };
          
    componentDidMount() {
        this.fetchQuote();
    }
    
    fetchQuote = () => {
        axios.get("https://api.gameofthronesquotes.xyz/v1/random")
            .then((resp) => {                
                const q  = resp.data.sentence;
                const a = resp.data.character.name;
                // console.log(q + "\n- " + a);
                this.setState({
                    quote: q,
                    author: a
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }
   
    
    render() {
        return (
            <div id="wrapper">
                <div id="quote-box">
                    <div className="quote-text">{this.state.quote}</div>
                    <div className="quote-author">- {this.state.author}</div>
                    <div className="buttons">
                        <button 
                            className="button" 
                            id="new-quote"
                            onClick={this.fetchQuote}
                        >New Quote</button>
                    </div>
                </div>
                <div className="footer"></div>
            </div>
        )
    }    
}
