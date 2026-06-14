import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

export default function Forest() {
  const trunkRef = useRef();
  const leavesRef = useRef();

  const positions = useMemo(() => {
    const pos = [];

    for (let z = 0; z > -3000; z -= 3) {
      for (let x = -180; x < -140; x += 6) {
pos.push([
  x + (Math.random() - 0.5) * 2,
  0,
  z + (Math.random() - 0.5) * 2
]);  

}

      for (let x = 140; x < 180; x += 6) {
        pos.push([x, 0, z]);
      }
    }

    return pos;
  }, []);

  useEffect(() => {
    const trunkDummy = new THREE.Object3D();
    const leavesDummy = new THREE.Object3D();

    positions.forEach((p, i) => {
      const height = 4 + Math.random() * 4;

      trunkDummy.position.set(...p);
      trunkDummy.scale.set(1, height / 4, 1);
      trunkDummy.updateMatrix();
      trunkRef.current.setMatrixAt(i, trunkDummy.matrix);

      leavesDummy.position.set(p[0], height + 2, p[2]);
      leavesDummy.scale.set(
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5
      );
      leavesDummy.updateMatrix();
      leavesRef.current.setMatrixAt(i, leavesDummy.matrix);
    });

    trunkRef.current.instanceMatrix.needsUpdate = true;
    leavesRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <>
      <instancedMesh
        ref={trunkRef}
        args={[null, null, positions.length]}
        castShadow
      >
        <cylinderGeometry args={[0.4, 0.5, 4, 6]} />
        <meshStandardMaterial color="#5b3a1e" />
      </instancedMesh>

      <instancedMesh
        ref={leavesRef}
        args={[null, null, positions.length]}
        castShadow
      >
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="#1f6b1f" />
      </instancedMesh>
    </>
  );
}