import { useXR, useXREvent } from "@react-three/xr";
import { forwardRef, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getHandsModels, getInteracting, useGrab } from "../redux/slices/grab";
import { Box3, Matrix3, Matrix4, Mesh, Object3D, Quaternion, Vector3 } from 'three'
import mergeRefs from 'react-merge-refs'
import { OBB } from 'three/examples/jsm/math/OBB'
import { useFrame } from "@react-three/fiber";

const Grabber = forwardRef(({
    disabled = false,
    onChange,
    callback,
    children,
    ...props
}, passedRef) => {
    const grabbingController = useRef()
    const ref = useRef()
    const previousTransform = useRef(undefined)
    const { isHandTracking } = useXR()

    const interacting = useSelector(getInteracting)
    const handModels = useSelector(getHandsModels)

    const grabHelper = useGrab()

    useXREvent('selectend', (e) => {
        if (
          e.controller === grabbingController.current &&
          interacting[e.controller.inputSource.handedness] &&
          ((isHandTracking && e.originalEvent.fake) || !isHandTracking)
        ) {
            grabHelper.clearHand(grabbingController.current?.inputSource?.handedness)
            grabbingController.current = undefined
            previousTransform.current = undefined
            onChange({ isGrabbed: false, controller: e.controller })
        }
      })

      useXREvent('selectstart', (e) => {
        // if the controller is already interacting, don't do anything
        // if hand tracking is enabled, but it's not a fake event, don't do anything
        if ((disabled && interacting[e.controller.inputSource.handedness]) || (isHandTracking && !e.originalEvent.fake)) {
          return
        }
  
        const model = handModels?.current[e.controller.inputSource.handedness]
  
        if (!model) {
          return
        }
  
        let colliding = false
  
        if (!callback) {
          // NOT USED FOR NOW HERE, WE USE THE CALLBACK FOR TESTING
          let mesh = undefined
          ref.current?.traverse?.((object) => {
            if (!mesh && object instanceof Mesh && object.geometry) {
              mesh = object
            }
          })
          if (!mesh) {
            return
          }
  
          const obb = new OBB(
            new Vector3().setFromMatrixPosition(ref.current?.matrixWorld),
            ((mesh).geometry?.boundingBox ).getSize(new Vector3()).multiply(ref.current?.scale).divideScalar(2),
            new Matrix3().setFromMatrix4(ref.current?.matrixWorld.clone().makeScale(1, 1, 1))
          )
  
          const matrix = model?.getHandRotationMatrix?.()
  
          const indexTip = model?.bones?.find?.((bone) => (bone).jointName === 'index-finger-tip')
          const thumbTip = model?.bones?.find?.((bone) => (bone).jointName === 'thumb-tip')
  
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
  
          colliding = obb.intersectsOBB(thumbOBB, Number.EPSILON) && obb.intersectsOBB(indexOBB, Number.EPSILON)
        } else {
          colliding = callback({ controller: e.controller, model: model })
        }
  
        if (colliding) {
          grabbingController.current = e.controller
          const transform = model.getHandTransform()
          previousTransform.current = transform.clone()
          onChange({ isGrabbed: true, controller: e.controller })
        }
      })

      useFrame(() => {
        if (!grabbingController.current || !previousTransform.current || !ref.current) {
          return
        }
  
        const model = handModels?.current[grabbingController.current.inputSource.handedness]
  
        if (!model) {
          return
        }
  
        let transform = model.getHandTransform()
  
        // apply previous transform
        ref.current?.applyMatrix4?.(previousTransform.current.clone().invert())
  
        if (isHandTracking) {
          // get quaternion from previous matrix
          const previousQuaternion = new Quaternion()
          previousTransform.current.decompose(new Vector3(), previousQuaternion, new Vector3(1, 1, 1))
  
          // get quaternion from current matrix
          const currentQuaternion = new Quaternion()
          transform.decompose(new Vector3(), currentQuaternion, new Vector3(1, 1, 1))
  
          // slerp to current quaternion
          previousQuaternion.slerp(currentQuaternion, 0.1)
  
          const position = model.getHandPosition()
          transform = new Matrix4().compose(position, previousQuaternion, new Vector3(1, 1, 1))
        }
  
        ref.current?.applyMatrix4?.(transform)
  
        ref.current?.updateWorldMatrix?.(false, true)
        previousTransform.current = transform.clone()
      })

      return (
        <group
          ref={mergeRefs([passedRef, ref])}
          {...props}
          // doesn't work for testing as we have to hover the block
          // onSelectStart={onSelectStart}>
        >
          {children}
        </group>
      )
})

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
        onChange={({ isGrabbed, controller }) => {
            setGrabbed(isGrabbed)
            if (isGrabbed) {
                grabHelper.setHand(controller.inputSource.handedness, group.current);
            }
          }}
        >
            {children}

        </Grabber>
    )
}

export default Grab