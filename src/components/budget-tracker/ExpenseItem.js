import React from "react";
import { TiDelete } from "react-icons/ti";

const ExpenseItem = (props) => {

    let divId = props.name + '_' + props.id;

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
        {props.name}
        <div>
            <span className='badge badge-pill badge-light mr-3' 
                style={{color: '#212529'}}
            >
                ${props.cost}
            </span>
            <TiDelete size='1.5em'></TiDelete>
        </div>
    </li>
    )
}


export default ExpenseItem;