import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type RemoveToDoType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddToDoType = {
    type: 'ADD-TODOLIST'
    title: string
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

const todolistId1 = v1();
const todolistId2 = v1();
const state = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

type ActionType = RemoveToDoType | AddToDoType | ChangeToDoTitleType | ChangeToDoFilterType
export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            const newState = [...state]
            newState.find(t => t.id === action.id)!.title = action.title
            return newState
        case "CHANGE-TODOLIST-FILTER":
            return state.map((t) => {
                if (t.id === action.id) {
                    t.filter = action.filter
                }
                return t
            })

        default:
            throw new Error('I don\'t understand this type')
    }
}
export const addTodolistAC = (title: string): AddToDoType => ({type: 'ADD-TODOLIST', title})
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
