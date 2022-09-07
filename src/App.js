import { Suspense } from 'react';
import Canvas from './builds/Canvas';
import Floor from './builds/Floor';
import Sky from './builds/Sky';
import Text from './builds/Text';

const App = () => (
  <Suspense fallback={null}>
    <Canvas withControllers withHands withCamera withLight>
      <Sky />
      <Floor opacity={0.2} color={'#666'}/>
      <mesh position={[0,.8,-1]}>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <Text text="Un super Site" position={[0,1.5,-1]} color="red"/>
      <Text text="Interdit à Rose Marie Dayou" position={[-15,.5,-.2]} color="green"/>
    </Canvas>
  </Suspense>
)

export default App;
