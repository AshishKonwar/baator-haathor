import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Road() {
  const roadTexture = useTexture("/textures/road.png");

  roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
  roadTexture.repeat.set(4, 60);

  return (
    <mesh
      position={[0, 0.05, -850]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[25, 1700]} />
      <meshStandardMaterial
        map={roadTexture}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}