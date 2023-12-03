import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App'
import './App.css'


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (newValue: FilterValueType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (id: string) => void
    filter: FilterValueType
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
            props.addTask(title.trim())
        } else setError('Title is required')
        setNewTitle('')
    }
    const addTaskOnPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? 'error' : ''} value={title} onChange={onChangeTitle} onKeyPress={addTaskOnPress}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map((task) => {
                const onClickHandler = () => {
                    props.removeTask(task.id)
                }
                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onClick={() => props.changeTaskStatus(task.id)}/>
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
                    onClick={() => props.changeFilter("all")}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => props.changeFilter("active")}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => props.changeFilter("completed")}>Completed
            </button>
        </div>
    </div>
}
