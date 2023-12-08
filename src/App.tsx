import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
export type StateType = {
    [todolistId: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const tasks = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [{id: v1(), title: "Protein", isDone: true}, {id: v1(), title: "Creatine", isDone: false}]
    }
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: 'all'},
        {id: todolistID2, title: "What to buy", filter: 'completed'},
    ])
    const [state, setState] = useState<StateType>(tasks)
    const removeTask = (taskId: string, todolistId: string) => {
        const filteredTasks = state[todolistId].filter(t => t.id !== taskId)
        state[todolistId] = filteredTasks
        setState({...state})
    }
    const addTask = (newTitle: string, todolistId: string) => {
        state[todolistId].push({title: newTitle, id: v1(), isDone: false})
        setState({...state})
    }
    const changeTaskStatus = (id: string, todolistId: string) => {
        const task = state[todolistId].find(t => t.id === id)
        if (task) {
            task.isDone = !task.isDone
            setState({...state})
        }
    }
    const changeTodolistFilter = (todolistId: string, filterValue: FilterValueType) => {
        const todo = todolists.find(t => t.id === todolistId)
        if (todo) {
            todo.filter = filterValue
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(t => t.id !== id))
        delete state[id]
        setState({...state})
    }
    return (
        <div className="App">
            {todolists.map((todo) => {
                let filteredTasks: TaskType[];
                switch (todo.filter) {
                    case "all":
                        filteredTasks = state[todo.id];
                        break;
                    case "active":
                        filteredTasks = state[todo.id].filter(task => !task.isDone)
                        break
                    case "completed":
                        filteredTasks = state[todo.id].filter(task => task.isDone)
                        break
                }
                return <Todolist
                    {...todo}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;

