import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function SkyTexture() {
  const texture = useTexture("/textures/sky.jpg");

  return (
    <mesh scale={10000}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}