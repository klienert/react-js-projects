import React, { useState } from "react";

export default function Counter() {

    // const [count, setCount] = useState(0);
    
    // try with a function in useState()
    // const [count, setCount] = useState(() => {
    //     console.log("run function");
    //     return 4
    // })

    // try with passing an object (*Notice the change in other functions...)
    // const [state, setState] = useState({count: 4, theme: 'blue'})
    // const count = state.count;
    // const theme = state.theme;

    // const incCount = () => {
    //     setState(prevState => {
    //         return { 
    //             ...prevState,
    //             count: prevState.count + 1                
    //         }
    //     })            
    // }

    // const decCount = () => {
    //     setState(prevState => {
    //         return { 
    //             ...prevState,
    //             count: prevState.count - 1
    //         }
    //     })
    // }

    // could also have multiple useState() OR in the case of a color change, just an additional function w/o a new state
    const [count, setCount] = useState(4);
    // const [theme, setTheme] = useState('');    

    const incCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    const decCount = () => {
        setCount(prevCount => prevCount - 1)
    }

    const spanClass = () => {
        let res = '';
        if (count > 0) {
            res = 'text-success p-1';
        } else if (count < 0) {
            res = 'text-danger p-1';
        } else {
            res = 'text-primary p-1';
        }        
        return res;
    }

    return <div className="container">

        <button onClick={decCount}> - </button>
        <span className={spanClass()}>{count}</span>        
        <button onClick={incCount}> + </button>
        
    </div>
}