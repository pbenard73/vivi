import { Suspense } from 'react';
import Canvas from './builds/Canvas';
import Floor from './builds/Floor';
import Sky from './builds/Sky';

const App = () => (
  <Suspense fallback={null}>
    <Canvas withControllers withHands withCamera withLight>
      <Sky />
      <Floor opacity={0.2} color={'#666'}/>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
    </Canvas>
  </Suspense>
)

export default App;
