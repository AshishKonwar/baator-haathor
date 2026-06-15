import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

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
    meshRef.current.frustumCulled = false;
  }, [positions]);

  return (
    <group>
      {/* Fence posts - visual only, colliders handled by invisible walls below */}
      <instancedMesh
        ref={meshRef}
        args={[null, null, positions.length]}
        castShadow
        frustumCulled={false}
      >
        <boxGeometry args={[0.2, 2, 0.2]} />
        <meshStandardMaterial color="#8b5a2b" />
      </instancedMesh>

      {/* Left fence rails - visual */}
      <mesh position={[-12, 1.5, -950]} frustumCulled={false}>
        <boxGeometry args={[0.1, 0.1, 1900]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[-12, 0.8, -950]} frustumCulled={false}>
        <boxGeometry args={[0.1, 0.1, 1900]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* Right fence rails - visual */}
      <mesh position={[12, 1.5, -950]} frustumCulled={false}>
        <boxGeometry args={[0.1, 0.1, 1900]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[12, 0.8, -950]} frustumCulled={false}>
        <boxGeometry args={[0.1, 0.1, 1900]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* ✅ Invisible physical wall - LEFT */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-12, 2, -950]} visible={false} frustumCulled={false}>
          <boxGeometry args={[0.5, 4, 1900]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>

      {/* ✅ Invisible physical wall - RIGHT */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[12, 2, -950]} visible={false} frustumCulled={false}>
          <boxGeometry args={[0.5, 4, 1900]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </group>
  );
}