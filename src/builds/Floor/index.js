import { useEffect, useRef } from "react"
import assets from "../../utils/assets"
import Texture from "../Texture"
import MovementController from "./MovementController"
import TeleportTravel from "./TeleportTravel"


const Floor = ({withTeleport, grass, size = [40,40], color="#666", opacity=1, material, ...props}) => {
    const innerFloor = (
            <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
                <planeBufferGeometry attach="geometry" args={size}/>
                 {material || 
                 (grass && <Texture path={assets('/models/textures/grass.jpg')} /> ) ||
                    <meshStandardMaterial attach="material" transparent={opacity < 1} color={color} opacity={opacity}/> }
            </mesh>
    )

    if (withTeleport) {
        return (
            <>
            <TeleportTravel useNormal>
                {innerFloor}
            </TeleportTravel>
            <MovementController />
			<MovementController
				hand="left"
				applyRotation={false}
				applyHorizontal={true}
			/>
            </>
        )
    }

    return innerFloor
}

export default Floor