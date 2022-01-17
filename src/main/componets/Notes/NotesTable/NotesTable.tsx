import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {deleteNoteDataTC, InitialStateType, NoteDataType, updateNoteTC} from "../../../app-reducer";
import styles from "./NotesTable.module.scss"
import {Button} from "../../common/Button/Button";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import {hashtagCreate} from "../Notes";


export function NotesTable() {
    const dispatch = useDispatch()
    const notesData = useSelector<AppRootStateType, InitialStateType>(state => state.app)
    const hashFilter = useSelector<AppRootStateType, string>(state => state.hashtag.hashFilter)

    const changeNoteData = (title: string, text: string, id: string, hash: string[]) => {
        let hashtags = hashtagCreate(text)
        dispatch(updateNoteTC({name: title, text, id, hash: hashtags}))
    }

    const changeNoteHash = (title: string, text: string, id: string, hash: string, idHash: number, index: number) => {
        let copyNotesData = {...notesData}
        let changedHashArray = copyNotesData[index].hash
        changedHashArray[idHash] = hash
        dispatch(updateNoteTC({name: title, text, id, hash: changedHashArray}))
    }

    const onDeleteBtnClick = (id: string) => {
        dispatch(deleteNoteDataTC(id))
    }

    let filtredNotesData = [...notesData]

    if (hashFilter !== '' && hashFilter !== '#All') {
        filtredNotesData = notesData.filter(note => {
            return note.hash.find(e => e === hashFilter)
        })
    }

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                <tr>
                    <th className={styles.title}>Title</th>
                    <th className={styles.text}>Note</th>
                    <th className={styles.hashtag}>Hashtag</th>
                    <th className={styles.actions}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtredNotesData.map((elem: NoteDataType, index) => (
                    <tr key={`key_${elem.id}`}>
                        <td className={styles.title}>
                            <b>
                                <EditableSpan
                                    value={elem.name}
                                    onChange={(title) => changeNoteData(title, elem.text, elem.id, elem.hash)}/>
                            </b>
                        </td>
                        <td className={styles.text}>
                            <EditableSpan
                                value={elem.text}
                                onChange={(text) => changeNoteData(elem.name, text, elem.id, elem.hash)}/>
                        </td>
                        <td className={styles.hashtag}>
                            {elem.hash && elem.hash.map((h, i) =>
                                <div className={styles.hashtagItem}>
                                    <EditableSpan
                                        key={`key_${elem.id}${i}`}
                                        value={h}
                                        onChange={(hash) => changeNoteHash(elem.name, elem.text, elem.id, hash, i, index)}/>
                                </div>)
                            }
                        </td>
                        <td className={styles.actions}>
                            <Button
                                classBtn={'bigDeleteBtn'}
                                onClick={() => onDeleteBtnClick(elem.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}