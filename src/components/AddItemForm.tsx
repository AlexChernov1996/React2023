import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css'
type AddItemPropsType ={
    addItemCallback:(title:string)=>void
}
const AddItemForm = (props:AddItemPropsType) => {
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
            <input className={error ? 'error' : ''} value={title} onChange={onChangeTitle} onKeyPress={addItemOnKeyPress}/>
            <button onClick={addItemCallback}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;
