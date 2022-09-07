import { useLoader } from "@react-three/fiber"
import * as THREE from 'three'

const Dome = ({picture, args=[500, 60, 40]}) => {
    const texture = useLoader(THREE.TextureLoader, picture)

    return (
        <mesh>
        <sphereBufferGeometry attach="geometry" args={args} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
        </mesh>
    )
}

export default Dome