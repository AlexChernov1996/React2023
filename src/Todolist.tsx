import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App'
import './App.css'


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (todolistId: string, newValue: FilterValueType) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setNewTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
        } else setError('Title is required')
        setNewTitle('')
    }
    const addTaskOnPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const removeTodoHandler = () => {
        props.removeTodolist(props.id)
    }

    return <div>
       <div>
           <h3>{props.title}</h3>
        <button onClick={removeTodoHandler}>x</button>
           </div>
        <div>
            <input className={error ? 'error' : ''} value={title} onChange={onChangeTitle} onKeyPress={addTaskOnPress}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map((task) => {
                const onClickHandler = () => {
                    props.removeTask(task.id, props.id)
                }

                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onClick={() => props.changeTaskStatus(task.id, props.id)}/>
                        <span>{task.title}</span>
                        <button
                            onClick={onClickHandler}
                        >x
                        </button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={() => props.changeFilter(props.id, "all")}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => props.changeFilter(props.id, "active")}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => props.changeFilter(props.id, "completed")}>Completed
            </button>
        </div>
    </div>
}
