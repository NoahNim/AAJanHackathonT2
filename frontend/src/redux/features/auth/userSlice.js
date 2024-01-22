import { createSlice } from '@reduxjs/toolkit'

const initialState = { user: null, token: null }

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(
            state,
            { payload: { user, token } }
        ) {
            state.user = user
            state.token = token
        },
        restoreUser(
            state,
            { payload: { user, token } }
        ) {
            state.user = user
            state.token = token
        },
        removeUser(state) {
            state.user = null
            state.token = null
        }
    }
})


export const { setUser, restoreUser, removeUser } = userSlice.actions

export default userSlice.reducer