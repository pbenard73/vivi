import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    version: 0,
  }
  
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        increment: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.version += 1
        },
        decrement: (state) => {
        state.version -= 1
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSlice.actions

export default appSlice.reducer