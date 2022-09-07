import { Sky as DreiSky } from '@react-three/drei';

const Sky = ({sunPosition = [0, 1, 0]}) => <DreiSky sunPosition={sunPosition} />

export default Sky;