import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

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

    return (
        <div className="App">
            <TodoList
                removeTask={removeTask}
                title={"What to learn"}
                tasks={tasks}
            />
        </div>
    );
}

export default App;
