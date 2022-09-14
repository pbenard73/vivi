import * as THREE from 'three';


    const pointsPath = new THREE.CurvePath();
      const firstLine = new THREE.LineCurve3(
        new THREE.Vector3( -20, 0, -20 ),
        new THREE.Vector3( 20, 0, 20 )
      );
      pointsPath.add(firstLine);

//     const secondLine = new THREE.LineCurve3(
//         new THREE.Vector3(-1, 0, 0 ),
//         new THREE.Vector3( -1, 1, 0 )
//       );
    
//     const thirdLine = new THREE.LineCurve3(
//         new THREE.Vector3( -1, 1, 0 ),
//       new THREE.Vector3(-1, 1, 1 ),
//       );
    
  
//     const bezierLine = new THREE.CubicBezierCurve3(
//       new THREE.Vector3( -1, 1, 1 ),
//       new THREE.Vector3( -0.5, 1.5, 0 ),
//       new THREE.Vector3( 2.0, 1.5, 0 ),
//       new THREE.Vector3( -1, 0, 1 )
//   );
//       pointsPath.add(firstLine);
//       pointsPath.add(secondLine);
//       pointsPath.add(thirdLine);
//       pointsPath.add(bezierLine);
      
      export default pointsPath;     
               
