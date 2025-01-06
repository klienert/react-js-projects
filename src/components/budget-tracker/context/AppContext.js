import React, { createContext, useReducer } from "react";

const AppReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        default: 
            return state;
    }
}

const initialState = {
    budget: 7500,
    expenses: [
        { id: 10, name: 'mortgage', cost: 1600 },
        { id: 11, name: 'groceries', cost: 450 },
        { id: 12, name: 'gasoline', cost: 100 },        
        { id: 13, name: 'clothing', cost: 250 },
    ]
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                budget: state.budget,
                expenses: state.expenses,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}