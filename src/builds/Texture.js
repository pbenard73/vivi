import React, { useEffect, useState } from 'react';

import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'

const Texture = ({path}) => {
    const colorMap = useLoader(TextureLoader, path)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (colorMap) {
            colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
            colorMap.repeat.set(2,2)
            setReady(true)
        }
    }, [colorMap])

    return ready && <meshStandardMaterial map={colorMap} repeat={[10,10]}/>
}

export default Texture