import { createSlice } from '@reduxjs/toolkit'

const initialState = { user: null, token: null }

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(
            state,
            action
        ) {
            // let newState = {
            //     user: action.payload.user,
            //     token: action.payload.token
            // }
            // console.log(newState)
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