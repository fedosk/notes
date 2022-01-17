import React, {useState} from 'react';
import styles from "./Notes.module.scss";
import {InputText} from "../common/InputText/InputText";
import {Button} from "../common/Button/Button";
import {NotesTable} from "./NotesTable/NotesTable";
import {useDispatch} from "react-redux";
import {setNoteDataTC} from "../../app-reducer";
import {hashtagCreate} from "../../hashtagCreate/hashtagCreateFunction";

export const Notes = () => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    let hashtags = hashtagCreate(text)

    const onClickCreateNoteBtn = () => {
        dispatch(setNoteDataTC(title, text, hashtags))
        setTitle('')
        setText('')
    }

    return (
        <div className={styles.notesWrapper}>
            <div className={styles.notesCreationBarWrapper}>
                <div className={styles.inputsWrapper}>
                    <InputText value={title} onChangeText={setTitle} placeholder="Title"/>
                    <InputText value={text} onChangeText={setText} placeholder="Note"/>
                </div>
                <Button classBtn={"confirmBtn"} onClick={onClickCreateNoteBtn}>Save</Button>
            </div>
            <NotesTable/>
        </div>
    );
}
