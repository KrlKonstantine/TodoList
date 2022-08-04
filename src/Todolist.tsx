import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    let activeButtonStyle = {marginInline:"2px",border:"1px solid",padding:"9px",color:"black",background: "yellowgreen",/*maxWidth:'90px',maxHeight:'35px',minWidth:'80px',minHeight:'34px'*/}
    let inactiveButtonStyle = {border:"1px solid",color:"black",background: "gray",/*maxWidth:'65px',maxHeight:'35px',minWidth:'50px',minHeight:'34px'*/}

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} aria-label="delete">
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" />*/}
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} style={{color:"darkgreen"}} />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>

            <Button onClick={onAllClickHandler}  style={props.filter === "all" ? activeButtonStyle : inactiveButtonStyle } >All</Button>
            <Button onClick={onActiveClickHandler} style={props.filter === "active" ? activeButtonStyle : inactiveButtonStyle }  >Active</Button>
            <Button onClick={onCompletedClickHandler} style={props.filter === "completed" ? activeButtonStyle : inactiveButtonStyle } >Completed</Button>

        </div>
    </div>
}


