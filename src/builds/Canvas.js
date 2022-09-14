import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas as FiberCanvas, useThree} from '@react-three/fiber'
import { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useSelector } from 'react-redux';

const Camera = () => {
    const { camera } = useThree();
    // const freezedCamera = useSelector(state => state.app.freezeCamera)

    return (
    <OrbitControls 
    camera={camera} 
    onStart={e => {
      if (true) {
        return null
      }
    }}
    />
    )
}

const Light = ({position=[10, 10, 10]}) => <pointLight position={position} />

const Canvas = ({withControllers, withHands, withCamera, withLight, children, ...props}) => {
  const freezedCamera = useSelector(state => state.app.freezedCamera)
   return (
    <>
      <VRButton />
      <FiberCanvas style={{height:'100vh'}} height={window.innerHeight} width={window.innerWidth}>
        <XR>
          {withControllers && <Controllers />}
          {withHands && <Hands />}
          {withCamera && !freezedCamera && <Camera />}
          {withLight && <Light />}
          {children}
        </XR>
      </FiberCanvas>
    </>
   )
   }
export default Canvas