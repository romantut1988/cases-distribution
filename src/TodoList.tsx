import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const todolistItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)

        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const isAddTaskNotPossible = !title.length || title.length > maxTitleLength


    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTaskHandler = isAddTaskNotPossible ? undefined :
        (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: "white"}}>Title should be shorter </div>
    const longTitleErrorMessage = title.length > maxTitleLength && <div style={{color: "red"}}>Title is too long</div>

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Enter task title, please"
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}/>
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
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
