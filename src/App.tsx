import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "Angular", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const removeTask = (tasksId: string) => {
        setTasks(tasks.filter((tasks) => tasks.id !== tasksId))
        // console.log(tasks)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTaskForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }
    let tasksForRender: Array<TaskType> = getFilteredTaskForRender(tasks, filter)

    return (
        <div className="App">
            <TodoList
                removeTask={removeTask}
                title={"What to learn"}
                tasks={tasksForRender}
                filter={filter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

export default App;
