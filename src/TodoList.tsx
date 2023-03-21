import React, {useRef, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const todolistItems = props.tasks.map((task) => {

        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>x
                </button>
            </li>
        )
    })


    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Enter task title, please"
                    value={title}
                    onKeyDown={(e) => e.key === "Enter" && addTaskHandler()}
                    onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button
                    disabled={title.length === 0 || title.length > 20}
                    onClick={addTaskHandler}>
                    +
                </button>
                {(title.length > 10 && title.length <= 20) &&
                <div style={{color: "white"}}>Title should be shorter </div>}
                {title.length > 20 && <div style={{color: "red"}}>Title is too long</div>}
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodolistFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTodolistFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTodolistFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
