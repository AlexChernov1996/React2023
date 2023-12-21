import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveToDoType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddToDoType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
type ChangeToDoTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeToDoFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


type ActionType = RemoveToDoType | AddToDoType | ChangeToDoTitleType | ChangeToDoFilterType
export const todolistsReducer = (state: TodolistType[] = [], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.id, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            const newState = [...state]
            newState.find(t => t.id === action.id? t.title = action.title: t)
            return newState
        case "CHANGE-TODOLIST-FILTER":
            return state.map((t) => {
                if (t.id === action.id) {
                    t.filter = action.filter
                }
                return t
            })
        default:
            return state
    }
}
export const addTodolistAC = (title: string): AddToDoType => ({type: 'ADD-TODOLIST', title, id: v1()})
export const removeTodolistAC = (id: string): RemoveToDoType => ({type: 'REMOVE-TODOLIST', id})
export const changeTodolistTitleAC = (title: string, id: string): ChangeToDoTitleType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
})
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeToDoFilterType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
})
