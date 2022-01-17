import React from "react";
import styles from "./HashtagSidebar.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {InitialStateType, NoteDataType, updateNoteTC} from "../../app-reducer";
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {Button} from "../common/Button/Button";
import {getNotesDataRequest} from "./hashtag-reducer";

export const HashTagSidebar = () => {
    const dispatch = useDispatch()
    const notesData = useSelector<AppRootStateType, InitialStateType>(state => state.app)

    let allHashtagsArr: string[] = []

    for (let i = 0; i < notesData.length; i++) {
        for (let j = 0; j < notesData[i]["hash"].length; j++) {
            allHashtagsArr.push(notesData[i]["hash"][j])
        }
    }

    const sortArr = allHashtagsArr.filter((it, index) => index === allHashtagsArr.indexOf(it = it.trim()) && it !== '');

    const changeNoteHash = (title: string, text: string, id: string, hash: string, idHash: number, index: number) => {
        let copyNotesData = {...notesData}
        let changedHashArray = copyNotesData[index].hash
        changedHashArray[idHash] = hash
        dispatch(updateNoteTC({name: title, text, id, hash: changedHashArray}))
    }

    const changeHashFilter = (hash: string) => {
        dispatch(getNotesDataRequest(hash))
    }

    return (
        <div className={styles.sidebarWrapper}>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th className={styles.hashtag}>Hashtags</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <Button
                            classBtn={'btn'}
                            onClick={() => changeHashFilter('#All')}>
                            <td className={styles.hashtag}>
                                <EditableSpan
                                    value={'#All'}
                                    onChange={changeNoteHash}/>
                            </td>
                        </Button>
                    </tr>
                    {sortArr.map((elem, index) => (

                        <tr key={`key_${elem}_${index}`}>
                            <Button
                                classBtn={'btn'}
                                onClick={() => changeHashFilter(elem)}>
                                <td className={styles.hashtag}>
                                    <EditableSpan
                                        value={elem}
                                        onChange={changeNoteHash}/>
                                </td>
                            </Button>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}