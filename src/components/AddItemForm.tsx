import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css'
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type AddItemPropsType = {
    addItemCallback: (title: string) => void
}
const AddItemForm = (props: AddItemPropsType) => {
    const [title, setNewTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }
    const addItemCallback = () => {
        if (title.trim()) {
            props.addItemCallback(title.trim())
        } else setError('Title is required')
        setNewTitle('')
    }
    const addItemOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemCallback()
        }
    }
    return (
        <div>
            <TextField error={!!error} helperText={error}
                       variant="standard" label={"Add title"} value={title}
                       onChange={onChangeTitle}
                       onKeyPress={addItemOnKeyPress}/>
            <Button variant="text" size="large" onClick={addItemCallback}><AddIcon fontSize="large"/></Button>
        </div>
    );
};

export default AddItemForm;
