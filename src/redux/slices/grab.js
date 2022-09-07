import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

const initialState = {
    hands: {
        interacting: {
            current: {}
        }
    },
    models: null
  }
  
export const grabSlice = createSlice({
    name: 'grab',
    initialState,
    reducers: {
        setHands: (state, {payload}) => {
         state.hands = payload;
        },
        clearHand: (state, {payload}) => {
            if (state.hands.interacting.current?.[payload]) {
                state.hands.interacting.current[payload] = undefined;
            }
        },
        setHand: (state, {payload}) => {
            const {type, value} = payload;

            state.hands.interacting.current[type] = value

        }
    },
})

// Action creators are generated for each case reducer function
export const { setHands, clearHand, setHand} = grabSlice.actions

export const getInteracting = state => ({
    left: state.grab.hands.interacting?.current?.left,
    right: state.grab.hands.interacting?.current?.right,
})

export const getHandsModels = state => state.grab.hands.models

export default grabSlice.reducer

export const useGrab = () => {
    const dispatch = useDispatch()

    return {
        clearHand: type => dispatch(clearHand(type)),
        setHand: (type, value) => dispatch(setHand({type, value}))
    }
}

