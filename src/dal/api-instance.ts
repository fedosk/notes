import axios from "axios";

export const instance = axios.create({
    baseURL: "https://notes-fedos.herokuapp.com/note"
})
