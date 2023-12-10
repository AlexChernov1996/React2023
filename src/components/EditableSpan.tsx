import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type SpanPropsType = {
    title: string
    changeTitle:(newTitle:string)=>void
}
const EditableSpan = (props: SpanPropsType) => {
    const [changeMode, setChangeMode] = useState(false)
    const [title, setTitle] = useState<string>(props.title)
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlurHandler=()=>{
        props.changeTitle(title)
        setChangeMode(false)
    }
    return (<>
            {changeMode ?
                <TextField variant="standard" onChange={changeTitleHandler} autoFocus={true} onBlur={onBlurHandler}
                       value={title}/>
                : <span onDoubleClick={() => setChangeMode(true)}>{props.title}</span>
            }
        </>
    );
};

export default EditableSpan;
