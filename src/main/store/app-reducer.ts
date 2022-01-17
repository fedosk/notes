import {Dispatch} from "redux";
import {notesApi} from "../../dal/notes-api";


const GET_NOTES_DATA = 'GET_NOTES_DATA'
const SET_NOTE = 'SET_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'

export type NoteDataType = {
    name: string
    text: string
    id: string
    hash: string[]
}

export type InitialStateType = NoteDataType[]

const initialState: InitialStateType = []

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_NOTES_DATA:
            return [...state, ...action.data]
        case SET_NOTE:
            return [...state, action.noteData]
        case UPDATE_NOTE:
            return state.map(n => n.id === action.noteData.id ? action.noteData : n)
        case DELETE_NOTE:
            return state.filter(n => n.id !== action.id)
        default:
            return state
    }
}

export const getNotesDataRequest = (data: InitialStateType) => ({type: GET_NOTES_DATA, data} as const)
export const setNote = (noteData: NoteDataType) => ({type: SET_NOTE, noteData} as const)
export const updateNote = (noteData: NoteDataType) => ({type: UPDATE_NOTE, noteData} as const)
export const deleteNote = (id: string) => ({type: DELETE_NOTE, id} as const)

export const getNotesDataTC = () => (dispatch: Dispatch<ActionsType>) => {
    notesApi.getData()
        .then(res => {
            dispatch(getNotesDataRequest(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const setNoteDataTC = (name: string, text: string, hash: string[]) => (dispatch: Dispatch<ActionsType>) => {
    notesApi.sendData(name, text, hash)
        .then(res => {
            dispatch(setNote(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const updateNoteTC = (noteData: NoteDataType) => (dispatch: Dispatch<ActionsType>) => {
    notesApi.updateData(noteData)
        .then(res => {
            dispatch(updateNote(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const deleteNoteDataTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    notesApi.deleteData(id)
        .then(res => {
            dispatch(deleteNote(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

type ActionsType = ReturnType<typeof getNotesDataRequest>
    | ReturnType<typeof setNote>
    | ReturnType<typeof updateNote>
    | ReturnType<typeof deleteNote>