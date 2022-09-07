
import { useRef, useState } from "react";
import { useGrab } from "../redux/slices/grab";
import { Box3, Matrix3, Matrix4, Mesh, Object3D, Quaternion, Vector3 } from 'three'
import { OBB } from 'three/examples/jsm/math/OBB'
import Grabber from "./Grabber";

const Grab = ({children, ...props}) => {
    const group = useRef()
    const [isGrabbed, setGrabbed] = useState(false)
    const grabHelper = useGrab()

const callback = ({ controller, model }) => {
    // do initial position check (if futher, don't check for collisions)
    const position = model.getHandPosition()
    const cratePosition = group.current.getWorldPosition(new Vector3())

    // calculate based on bounding box
    // for now hardcodedackage
    if (position.distanceTo(cratePosition) > 0.2) {
      // console.log('IGNORED')
      return
    }

    let mesh = undefined
    group.current.traverse((object) => {
      if (!mesh && object instanceof Mesh && object.geometry) {
        mesh = object
      }
    })
    if (!mesh) {
      return
    }

    const obb = new OBB(
      new Vector3().setFromMatrixPosition(group.current.matrixWorld),
      ((mesh).geometry.boundingBox).getSize(new Vector3()).multiply(group.current.scale).divideScalar(2),
      new Matrix3().setFromMatrix4(group.current.matrixWorld.clone().makeScale(1, 1, 1))
    )

    const matrix = model.getHandRotationMatrix()

    const indexTip = model.bones.find((bone) => (bone ).jointName === 'index-finger-tip')
    const thumbTip = model.bones.find((bone) => (bone).jointName === 'thumb-tip')

    const thumbOBB = new OBB(
      indexTip.getWorldPosition(new Vector3()),
      new Vector3(0.05, 0.05, 0.05).divideScalar(2),
      new Matrix3().setFromMatrix4(matrix)
    )
    const indexOBB = new OBB(
      thumbTip.getWorldPosition(new Vector3()),
      new Vector3(0.05, 0.05, 0.05).divideScalar(2),
      new Matrix3().setFromMatrix4(matrix)
    )

    return obb.intersectsOBB(thumbOBB, Number.EPSILON) && obb.intersectsOBB(indexOBB, Number.EPSILON)
  }

    return (
        <Grabber
        ref={group}
        callback={callback}
        {...props}
      dispose={null}
        onChange={({ isGrabbed: givenIsGrabbed, controller }) => {
            setGrabbed(givenIsGrabbed)
            if (givenIsGrabbed) {
                grabHelper.setHand(controller.inputSource.handedness, group.current);
            }
          }}
        >
            {children}

        </Grabber>
    )
}

export default Grab