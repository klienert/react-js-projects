import React, { useState, useEffect, useRef } from "react";

const InputSearchComp = ({ 
    name = "", 
    id = "", 
    className = "", 
    placeholder = "", 
    options = [], 
    value = "", 
    field = "", 
    updateFunction = () => {}
}) => {

    const [query, setQuery] = useState('');
    // const [suggestion, setSuggestion] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const inputRef = useRef(null)
    

    const handleChange = (e) => {
        const input = e.target.value;        
        setQuery(input);

        if (input.trim() === '') {
            setFilteredOptions([]);
        } else {
            const matches = options.filter(o =>
                o.name.toLowerCase().startsWith(input.toLowerCase())
            );
            setFilteredOptions(matches);
        }
    };

    const handleSelect = (option) => {
        setQuery(option.name);
        setFilteredOptions([]);
        setHighlightedIndex(-1);
        updateFunction(field, option);
    }

    const handleKeyDown = (e) => {
        if (filteredOptions.length === 0) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                );
            break;

            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredOptions.length - 1
                );
            break;

            case 'Enter':
            case 'Tab':
                if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    e.preventDefault();
                    handleSelect(filteredOptions[highlightedIndex]);
                }
            break;

            case 'Escape':
                setFilteredOptions([]);
                setHighlightedIndex(-1);
            break;
        
            default:
                break;
        }
    }

    useEffect(() => {
        const list = document.getElementById(`dropdown-${id}`);
        if (list && highlightedIndex >= 0) {
            const item = list.children[highlightedIndex];
            if (item) {
                item.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex, id]);

    return (
        <>
            <input
                type="text"
                ref={inputRef}
                name={name}
                id={id}
                className={className}
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                style={{
                padding: '8px',
                width: '100%',
                fontSize: '16px',
                boxSizing: 'border-box'
                }}
            />

{filteredOptions.length > 0 && (
        <ul
          id={`dropdown-${id}`}
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            zIndex: 10,
            maxHeight: '150px',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: index === highlightedIndex ? '#e6f7ff' : 'black'
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
      </>
    )
}

export default InputSearchComp;

