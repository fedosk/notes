const SET_HASH_FILTER = 'SET_HASH_FILTER'

export type InitialStateType = {
    hashFilter: string
}

const initialState: InitialStateType = {
    hashFilter: '',
}

export const hashtagReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_HASH_FILTER:
            return {...state, hashFilter: action.hashFilter}
        default:
            return state
    }
}

export const getNotesDataRequest = (hashFilter: string) => ({type: SET_HASH_FILTER, hashFilter} as const)


type ActionsType = ReturnType<typeof getNotesDataRequest>
