const Floor = ({size = [40,40], color="#666", opacity=1, material}) => (
    <>
        <mesh rotation={[-Math.PI / 2, 0, 0]} >
        <planeBufferGeometry attach="geometry" args={size}/>
        {material || <meshStandardMaterial attach="material" transparent={opacity < 1} color={color} opacity={opacity}/> }
        </mesh>
        
    </>
)

export default Floor