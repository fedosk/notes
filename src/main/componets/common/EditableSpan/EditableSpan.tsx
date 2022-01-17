import React, {ChangeEvent, useState} from 'react';
import styles from './EditableSpan.module.scss'


export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string, ...rest: any) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [value, setValue] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setValue(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(value);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return editMode

        ? <input
            className={styles.editableSpanInput}
            value={value}
            autoFocus
            onChange={changeTitle}
            onBlur={activateViewMode}/>
        //? <InputText value={value} onChange={changeTitle} autoFocus onBlur={activateViewMode} placeholder="Title"/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
