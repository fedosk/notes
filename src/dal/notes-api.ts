import {AxiosResponse} from 'axios'
import {InitialStateType, NoteDataType} from "../main/store/app-reducer";
import {instance} from "./api-instance";

export const notesApi = {
    getData() {
        return instance.get<InitialStateType, AxiosResponse<InitialStateType>>('list')
    },
    sendData(name: string, text: string, hash: string[]) {
        return instance.post<NoteDataType, AxiosResponse<NoteDataType>>('/add', {name, text, hash})
    },
    updateData(noteData: NoteDataType) {
        return instance.patch<NoteDataType, AxiosResponse<NoteDataType>>(`/update/${noteData.id}`, noteData)
    },
    deleteData(id: string) {
        return instance.delete<string, AxiosResponse<string>>(`/delete/${id}`)
    }
}

