import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Road() {
  const riverTexture = useTexture("/textures/road_texture.png");

  riverTexture.wrapS = riverTexture.wrapT = THREE.RepeatWrapping;
  riverTexture.repeat.set(4, 100);  
  
  return (
    <mesh
      position={[0, 0.05, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[25, 3000]} />
      <meshStandardMaterial
        map={riverTexture}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}