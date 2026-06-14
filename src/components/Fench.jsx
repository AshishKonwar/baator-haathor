import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

export default function Fence() {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const pos = [];

    for (let z = 0; z > -1900; z -= 5) {
      pos.push([-12, 1, z]);
      pos.push([12, 1, z]);
    }

    return pos;
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();

    positions.forEach((p, i) => {
      dummy.position.set(...p);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
  <group>
    <instancedMesh
      ref={meshRef}
      args={[null, null, positions.length]}
      castShadow
    >
      <boxGeometry args={[0.2, 2, 0.2]} />
      <meshStandardMaterial color="#8b5a2b" />
    </instancedMesh>

    <mesh position={[-12, 1.5, -950]}>
      <boxGeometry args={[0.1, 0.1, 1900]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>

    <mesh position={[-12, 0.8, -950]}>
      <boxGeometry args={[0.1, 0.1, 1900]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>

    <mesh position={[12, 1.5, -950]}>
      <boxGeometry args={[0.1, 0.1, 1900]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>

    <mesh position={[12, 0.8, -950]}>
      <boxGeometry args={[0.1, 0.1, 1900]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>
  </group>
);
}