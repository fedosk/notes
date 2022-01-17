import React, {useEffect, useState} from 'react';
import styles from "./Notes.module.scss";
import {InputText} from "../common/InputText/InputText";
import {Button} from "../common/Button/Button";
import {NotesTable} from "./NotesTable/NotesTable";
import {useDispatch} from "react-redux";
import {getNotesDataTC, setNoteDataTC} from "../../store/app-reducer";
import {hashtagCreate} from "../../hashtagCreate/hashtagCreateFunction";

export const Notes = () => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [errorTitle, setTitleError] = useState<boolean>(false)
    const [errorText, setTextError] = useState<boolean>(false)

    let hashtags = hashtagCreate(text)

    useEffect(() => {
        dispatch(getNotesDataTC())
    }, [])

    const onClickCreateNoteBtn = () => {
        if (title.trim() !== '' && text.trim() !== '') {
            dispatch(setNoteDataTC(title, text, hashtags))
            setTitle('')
            setText('')
            setTitleError(false)
            setTextError(false)
        }
        if (title.trim() === '') {
            setTitleError(true)
        }
        if (text.trim() === '') {
            setTextError(true)
        }
    }

    return (
        <div className={styles.notesWrapper}>
            <div className={styles.notesCreationBarWrapper}>
                <div className={styles.inputsWrapper}>
                    <InputText
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Title"/>
                    <InputText
                        value={text}
                        onChangeText={setText}
                        placeholder="Note"/>
                </div>
                <Button
                    classBtn={"confirmBtn"}
                    onClick={onClickCreateNoteBtn}
                    disabled={errorTitle || errorText}>
                    Save
                </Button>
            </div>
            <NotesTable/>
        </div>
    );
}
