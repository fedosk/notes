import {AxiosResponse} from 'axios'
import {InitialStateType, NoteDataType} from "../main/app-reducer";
import {instance} from "./api-instance";

export const notesApi = {
    getData() {
        return instance.get<InitialStateType, AxiosResponse<InitialStateType>>('note/list')
    },
    sendData(name: string, text: string, hash: string[]) {
        return instance.post<NoteDataType, AxiosResponse<NoteDataType>>('/note/add', {name, text, hash})
    },
    updateData(noteData: NoteDataType) {
        return instance.patch<NoteDataType, AxiosResponse<NoteDataType>>(`/note/update/${noteData.id}`, noteData)
    },
    deleteData(id: string) {
        return instance.delete<string, AxiosResponse<string>>(`/note/delete/${id}`)
    }
}

