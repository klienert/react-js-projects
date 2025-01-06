import React from "react";
import Budget from "./Budget";
import ExpenseTotal from "./ExpenseTotal";
import Remaining from "./Remaining";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
import { AppProvider } from "./context/AppContext";

const BudgetTracker = () => {


    return (
        <AppProvider>
            <div className="budget-container">
                <h2 className="mt-3">My Budget Planner</h2>
                <div className="row mt-3">
                    <div className="col-sm">
                        <Budget />
                    </div>
                    <div className="col-sm">
                        <Remaining />
                    </div>
                    <div className="col-sm">
                        <ExpenseTotal />
                    </div>
                </div>
                <h3 className="mt-3">Expenses</h3>
                <div className="row mt-3">
                    <div className="col-sm">
                        <ExpenseList />
                    </div>
                </div>
                <h3 className="mt-3">Add Expenses</h3>
                <div className="row mt-3">
                    <div className="col-sm">
                        <AddExpenseForm />
                    </div>
                </div>
            </div>
        </AppProvider>        
    )
}

export default BudgetTracker;