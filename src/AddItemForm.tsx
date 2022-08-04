import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <span>
        <TextField error={!!error}
                   id="standard-basic" label={title} variant="outlined" size="small"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   helperText={error}
        />

        <Button variant="outlined" onClick={addItem} style={{background: "yellowgreen", height: "40px"}}>+</Button>
</span>

    </div>
}
