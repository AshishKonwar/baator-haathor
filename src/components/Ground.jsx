import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Ground() {
  const grassTexture = useTexture("/textures/grass.png");

  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;

  grassTexture.repeat.set(20, 1000);

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -1500]}
        receiveShadow
      >
        <planeGeometry args={[300, 5000]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>
    </group>
  );
}