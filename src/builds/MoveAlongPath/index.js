import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three'

const MoveAlongPath = ({path:givenPath, speed=1, alternate, children, ...props}) => {
    const dirZ = new THREE.Vector3( 0, 0, 1 );
    const axis = new THREE.Vector3( );
    const child = useRef()
    const [fraction, setFraction] = useState(0);
    const [path, setPath] = useState(givenPath)
    const [reverse, setReverse] = useState(false)

    useFrame(() => {
        const currentChild = child.current;
        const newPosition = path.getPoint(fraction);
        const tangent = path.getTangent(fraction);

        
        currentChild.position.copy(newPosition);
        axis.crossVectors( dirZ, tangent ).normalize();
        
        let radians = Math.acos( dirZ.dot( tangent ) );

        if (reverse) {
            radians += 3
        }
        
         currentChild.quaternion.setFromAxisAngle( axis, radians );

        setFraction(f => {
            let newFraction = f + (0.001 * speed)

            if (reverse) {
                newFraction = f - (0.001 * speed)
            }


            if (!reverse && newFraction > 1) {
                if (alternate) {
                    setReverse(true)
                    return 1;
                }
                return 0;
            }

            if (reverse && newFraction < 0) {
                setReverse(false)
                return 0
            }

            return newFraction
        });
    })

    return (
        <group ref={child} position={path.getPoint(0)}>
            {children}
        </group>
    )
}

export default MoveAlongPath