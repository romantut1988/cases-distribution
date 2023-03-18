import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "Angular", isDone: true},
        {id: 4, title: "Redux", isDone: false},
    ])

    const removeTask = (tasksId: number) => {
        setTasks(tasks.filter((tasks) => tasks.id !== tasksId))
        // console.log(tasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>("active")

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <TodoList
                removeTask={removeTask}
                title={"What to learn"}
                tasks={tasksForRender}
                changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

export default App;
