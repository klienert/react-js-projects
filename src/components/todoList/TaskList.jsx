import React from "react";
import Task from './Task';

const TaskList = ({taskList}) => {

    return (
        <div>
            {taskList.map((task, i) => {
                return (
                    <Task key={i} task={task}/>
                )
            })}
        </div>
    )
}

export default TaskList;