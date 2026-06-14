import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

export default function TeaGarden() {
  const meshRef = useRef();

  const positions = useMemo(() => {
  const pos = [];

  for (let z = 0; z > -1900; z -= 2) {
    for (let x = -150; x < -15; x += 6) {
      pos.push([x, 0.8, z]);
    }

    for (let x = 15; x < 150; x += 6) {
      pos.push([x, 0.8, z]);
    }
  }

  return pos;
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();

    positions.forEach((p, i) => {
      dummy.position.set(...p);
      dummy.scale.set(1, 0.6, 1);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, positions.length]}
      castShadow
    >
  <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#2f7d32" />
    </instancedMesh>
  );
}