import { Suspense } from 'react';
import Canvas from './builds/Canvas';
import Floor from './builds/Floor';
import MoveAlongPath from './builds/MoveAlongPath';
import Sky from './builds/Sky';
import Text from './builds/Text';
import cowPath from './data/cowPath';
import Cow from './models/Cow';
import Fountain from './models/Fountain';

const App = () =>  (
  <Suspense fallback={null}>
    <Canvas withControllers withHands withCamera withLight>
      <Sky />
      <Floor grass withTeleport opacity={1} color={'yellow'}/>
      <mesh position={[0,.8,-1]}>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <Text text="Un super Site" position={[0,1.5,-1]} color="red"/>
      <Text text="Interdit à Rose Marie Dayou" position={[-15,.5,-.2]} color="green"/>

      <MoveAlongPath path={cowPath} speed={0.2}>
        <Cow scale={[0.05,0.05,0.05]}/>
      </MoveAlongPath>
      <MoveAlongPath path={cowPath} speed={2} alternate>
        <Cow scale={[0.05,0.05,0.05]}/>
      </MoveAlongPath>
      <Fountain position={[-18,0,-18]} scale={[0.05,0.05,0.05]}/>
      
      
      <Cow position={[5,0,-5]} scale={[0.05,0.05,0.05]} rotation={[0, -Math.PI / 2, 0]}/>
    </Canvas>
  </Suspense>
)

export default App;
