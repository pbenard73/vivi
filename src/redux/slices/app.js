import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    version: 0,
    orbitControlEnable: true
  }
  
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setOrbitControlEnable: (state, {payload}) => {
            state.orbitControlEnable = payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setOrbitControlEnable } = appSlice.actions



export default appSlice.reducer