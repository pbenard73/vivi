import { useDispatch } from "react-redux"
import { setOrbitControlEnable } from "../slices/app"
import React from 'react'

const useApp = () => {
    const dispatch = useDispatch()

    return {
        orbitControl: {
            off: () => dispatch(setOrbitControlEnable(false)),
            on: () => dispatch(setOrbitControlEnable(true))
        }
    }
}

export default useApp