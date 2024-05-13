import React, { useState, useReducer } from "react";

export default function ReducerCheck() {

    const initialState = {
        message: "hi"
    };

    const reducer = (state, action) => {
        switch(action.type) {
            case "yell":
                return {
                    message: `HEY! I JUST SAID ${state.message}`
                }
            case "whisper":
                return {
                    message: `excuse me, I just said ${state.message}`
                }
        }
    }

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );
    
    // this is broken, just keeps concatenating the string to the message as you keep clicking

    return (
        <>
            <p>Message: {state.message}</p>
            <button
                onClick={() => dispatch({type: 'yell'})}
            >YELL
            </button>
            <button
                onClick={() => dispatch({type: 'whisper'})}
            >whisper
                </button>
        </>
    )
}