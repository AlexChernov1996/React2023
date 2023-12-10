import React from 'react';
import  {FilterValueType, TaskType} from './App'
import './App.css'
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";


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
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodoHandler = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return <div>
        <div>
            <EditableSpan changeTitle={changeTodolistHandler} title={props.title}/>
            <button onClick={removeTodoHandler}>x</button>
        </div>
        <div>
            <AddItemForm addItemCallback={addTask}/>
        </div>
        <ul>
            {props.tasks.map((task) => {
                const onClickHandler = () => {
                    props.removeTask(task.id, props.id)
                }
                const changeTaskTitleHandler = (newTitle: string) => {
                    props.changeTaskTitle(props.id, task.id, newTitle)
                }

                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onClick={() => props.changeTaskStatus(task.id, props.id)}/>
                        <EditableSpan changeTitle={changeTaskTitleHandler} title={task.title}/>
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
