import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (
    props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const todolistItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = !title.length || title.length > maxTitleLength


    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible ? undefined :
        (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: "white"}}>Title should be shorter </div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: "#f23391"}}>Title is too long!!!</div>
    const errorMessage = error && <div style={{color: "hotpink"}}>Title is hard required</div>

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Enter task title, please"
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodolistFilter("all")
                    }}>All
                </button>
                <button className={props.filter === "active" ? "btn-active" : ""}
                        onClick={() => {
                            props.changeTodolistFilter("active")
                        }}>Active
                </button>
                <button className={props.filter === "completed" ? "btn-active" : ""}
                        onClick={() => {
                            props.changeTodolistFilter("completed")
                        }}>Active
                </button>
            </div>
        </div>
    );
};

export default TodoList;
