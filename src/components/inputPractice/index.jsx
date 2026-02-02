import React, { useEffect, useState } from "react";
import InputSearchComp from "../inputs/input/InputSearchComp";
import { states } from "./states";

const InputPractice = () => {

    const [data, setData] = useState('');
    
    // const [query, setQuery] = useState('');
    // const [filteredStates, setFilteredStates] = useState([]);
    // const [suggestion, setSuggestion] = useState('');

    // const findSuggestion = (input) => {
    //     if (!input) return '';
    //     const match = states.map(s => s.name).find(state =>
    //         state.toLowerCase().startsWith(input.toLowerCase())
    //     );
    //     return match || '';
    // }

    // const handleChange = (e) => {
    //     const input = e.target.value;
    //     setQuery(input);
    //     setSuggestion(findSuggestion(input));
    // };

    // const handleKeyDown = (e) => {
    //     if ((e.key === 'ArrowRight' || e.key === 'Tab') && suggestion) {
    //         e.preventDefault();
    //         setQuery(suggestion);
    //         setSuggestion('');
    //     }
    // }

    const updateFunction = (e, field, value) => {        
        console.log('updateFn: ', e.target, field);
        
    }

    useEffect(() => {
        console.log('states: ', states);
    },[]);

    return (
        <div
            style={{
                position: 'relative',
                fontFamily: 'Roboto',
                padding: '20px'
            }}>
        <h3>Input Practice</h3>
        <h4>Search for State: </h4>
        <InputSearchComp 
            name="Search for State"            
            className={'sampleSearchInput'}
            placeholder={'start typing!'}
            value={''}
            options={states}
            field={'state'}
            updateFunction={updateFunction}            
        />
    </div>)

}

export default InputPractice;