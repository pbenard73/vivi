import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas as FiberCanvas, useThree} from '@react-three/fiber'
import { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';

const Camera = () => {
    const { camera } = useThree();
    return <OrbitControls camera={camera}/>
}

const Light = ({position=[10, 10, 10]}) => <pointLight position={position} />

const Canvas = ({withControllers, withHands, withCamera, withLight, children, ...props}) => (
    <>
      <VRButton />
      <FiberCanvas style={{height:'100vh'}}>
        <XR>
          {withControllers && <Controllers />}
          {withHands && <Hands />}
          {withCamera && <Camera />}
          {withLight && <Light />}
          {children}
        </XR>
      </FiberCanvas>
    </>
)
export default Canvas