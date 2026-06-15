import { useTexture } from "@react-three/drei";

export default function GameEnd() {
  const texture = useTexture("/images/GAMEEND.png");

  return (
    <mesh position={[0, 20, -1502]}>
      <planeGeometry args={[40, 60]} />
      <meshBasicMaterial
        map={texture}
        transparent
      />
    </mesh>
  );
}