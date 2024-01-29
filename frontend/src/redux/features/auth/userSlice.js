import { createSlice } from '@reduxjs/toolkit'
import { setCookie } from '../../app/hooks'

const initialState = { user: null, token: null }

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(
            state,
            action
        ) {
            setCookie("user", JSON.stringify(action.payload.user), 5)
            return action.payload
        },
        restoreUser(
            state,
            action
        ) {
            return action.payload
        },
        removeUser(state, action) {
            return action.payload
        }
    }
})


export const { setUser, restoreUser, removeUser } = userSlice.actions

export default userSlice.reducer