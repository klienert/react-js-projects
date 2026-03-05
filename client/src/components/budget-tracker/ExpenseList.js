import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "./context/AppContext";

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);

    
    // const expenses = [
    //     {id: 12, name: 'shopping', cost: 400}, 
    //     {id: 13, name: 'groceries', cost: 250}, 
    //     {id: 14, name: 'gasoline', cost: 50}, 
    // ];


    return (
        <ul className="list-group">
            {expenses.map((expense) => {
                return <ExpenseItem id={expense.id} name={expense.name} cost={expense.cost} />
            })}

        </ul>
    )
}

export default ExpenseList;