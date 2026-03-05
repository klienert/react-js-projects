import React, { useState } from "react";

import Header from './Header';
// import Task from './Task';
import TaskList from './TaskList';
import data from './data.json';


const Todo = () => {

    const [ taskList, setTaskList ] = useState(data);

    return (
        <>
            <Header />            
            <TaskList taskList={taskList}/>
        </>
    )
}

export default Todo;