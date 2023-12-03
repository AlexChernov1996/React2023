import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const tasks1 = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]
    const [state, setState] = useState<TaskType[]>(tasks1)
    const [filter, setFilter] = useState<FilterValueType>("all")
    const removeTask = (id: string) => {
        setState(state => state.filter((t) => t.id !== id))
    }
    const addTask = (newTitle: string) => {
        setState([...state, {title: newTitle, id: v1(), isDone: false}])
    }
    const changeTaskStatus = (id: string) => {
        const task = state.find(t => t.id === id)
        if (task) {
            task.isDone = !task.isDone
            setState([...state])
        }
    }
    let filteredTasks;
    switch (filter) {
        case "all":
            filteredTasks = state;
            break;
        case "active":
            filteredTasks = state.filter(task => !task.isDone)
            break
        case "completed":
            filteredTasks = state.filter(task => task.isDone)
            break
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={setFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter = {filter}
            />
        </div>
    );
}

export default App;

