import React from "react";
import styles from "./HashtagSidebar.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {InitialStateType} from "../../store/app-reducer";
import {Button} from "../common/Button/Button";
import {getNotesDataRequest} from "../../store/hashtag-reducer";

export const HashTagSidebar = () => {
    const dispatch = useDispatch()
    const notesData = useSelector<AppRootStateType, InitialStateType>(state => state.app)
    const hashFilter = useSelector<AppRootStateType, string>(state => state.hashtag.hashFilter)

    let allHashtagsArr: string[] = []

    for (let i = 0; i < notesData.length; i++) {
        for (let j = 0; j < notesData[i]["hash"].length; j++) {
            allHashtagsArr.push(notesData[i]["hash"][j])
        }
    }

    const sortArr = allHashtagsArr.filter((it, index) => index === allHashtagsArr.indexOf(it = it.trim()) && it !== '');

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
                    <tr className={hashFilter === '#All' ? styles.active : ''}>
                        <td className={styles.hashtag}>
                            <Button
                                classBtn={'hashBtn'}
                                onClick={() => changeHashFilter('#All')}>
                               #All
                            </Button>
                        </td>
                    </tr>
                    {sortArr.map((elem, index) => (
                        <tr key={`key_${elem}_${index}`}
                            className={hashFilter === elem ? styles.active : ''}>
                            <td className={styles.hashtag}>
                                <Button
                                    classBtn={'hashBtn'}
                                    onClick={() => changeHashFilter(elem)}>
                                    {elem}
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}