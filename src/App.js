import { Suspense } from 'react';
import Canvas from './builds/Canvas';
import Floor from './builds/Floor';
import Sky from './builds/Sky';
import Text from './builds/Text';
import Cow from './models/Cow';

const App = () => (
  <Suspense fallback={null}>
    <Canvas withControllers withHands withCamera withLight>
      <Sky />
      <Floor withTeleport opacity={0.2} color={'#666'}/>
      <mesh position={[0,.8,-1]}>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <Text text="Un super Site" position={[0,1.5,-1]} color="red"/>
      <Text text="Interdit à Rose Marie Dayou" position={[-15,.5,-.2]} color="green"/>
      <Cow position={[-5,0,5]} scale={[0.05,0.05,0.05]}/>
      <Cow position={[5,0,-5]} scale={[0.05,0.05,0.05]} rotation={[0, -Math.PI / 2, 0]}/>
    </Canvas>
  </Suspense>
)

export default App;
