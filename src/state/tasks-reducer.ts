import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddToDoType, RemoveToDoType} from "./todolist-reducer";


type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>


type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatus | ChangeTaskTitle | AddToDoType | RemoveToDoType
export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todoId]: [
                    {id: v1(), title: action.title, isDone: false}, ...state[action.todoId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoId]:
                    state[action.todoId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.id]: []}
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (todoId: string, taskId: string) => ({type: 'REMOVE-TASK' as const, todoId, taskId})
export const addTaskAC = (title: string, todoId: string) => ({type: 'ADD-TASK' as const, todoId, title})
export const changeTaskTitleAC = (taskId: string, todoId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE' as const,
    taskId,
    todoId,
    title
})
export const changeTaskStatusAC = (taskId: string, todoId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS' as const,
    taskId,
    todoId,
    isDone
})

