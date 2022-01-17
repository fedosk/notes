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
    const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    let repl = props.value.replace(/#(\w+)/g, '<b>#$1</b>');

    return editMode
        ? <textarea
            className={styles.editableSpanInput}
            value={value}
            autoFocus
            onChange={changeTitle}
            onBlur={activateViewMode}/>
        : <div
            className={styles.editableSpan}
            dangerouslySetInnerHTML={{__html: repl}}
            onDoubleClick={activateEditMode}/>
});
