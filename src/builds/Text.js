
import {  extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import typefaceData from "@compai/font-recursive/data/typefaces/normal-400.json";

extend({ TextGeometry })

const Text = ({text, font, color='black', position, ...props}) => {

    const loadedFont = new FontLoader().parse(font || typefaceData);

    return (
        <mesh position={position} {...props}>
            <textGeometry args={[text, {font: loadedFont, size:1, height: 1}]}/>
            <meshLambertMaterial attach='material' color={color}/>
        </mesh>
    )
}

export default Text