import React from 'react';
import { BsStar, BsStarFill } from "react-icons/bs";
import Toggle from './Toggle/index'

const Star = ({ onChange }) => {

    return (
        <Toggle onToggle={() => onChange()}>
            <Toggle.Button>
                <Toggle.On>
                    <BsStarFill className="toggle-star filled"/>
                </Toggle.On>
                <Toggle.Off>
                    <BsStar className="toggle-star " />
                </Toggle.Off>
            </Toggle.Button>
        </Toggle>
    )
}

export default Star;