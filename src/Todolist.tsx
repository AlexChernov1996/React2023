import {Button, ButtonGroup, IconButton, List, ListItem} from '@mui/material';
import React from 'react';
import {FilterValueType, TaskType} from './App'
import './App.css'
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import {Delete} from "@mui/icons-material";

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
            <Button onClick={removeTodoHandler}> <DeleteForeverIcon fontSize="large"/></Button>
        </div>
        <div>
            <AddItemForm addItemCallback={addTask}/>
        </div>
        <List>
            {props.tasks.map((task) => {
                const onClickHandler = () => {
                    props.removeTask(task.id, props.id)
                }
                const changeTaskTitleHandler = (newTitle: string) => {
                    props.changeTaskTitle(props.id, task.id, newTitle)
                }

                return (
                    <ListItem key={task.id} className={task.isDone ? "is-done" : ""}>
                        <Checkbox color="primary"
                                  checked={task.isDone}
                                  onClick={() => props.changeTaskStatus(task.id, props.id)}/>
                        <EditableSpan changeTitle={changeTaskTitleHandler} title={task.title}/>
                        <IconButton
                            onClick={onClickHandler}
                        ><Delete/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>
        <ButtonGroup variant="text" aria-label="text button group">
            <Button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={() => props.changeFilter(props.id, "all")}>All
            </Button>
            <Button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => props.changeFilter(props.id, "active")}>Active
            </Button>
            <Button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => props.changeFilter(props.id, "completed")}>Completed
            </Button>
        </ButtonGroup>
    </div>
}
