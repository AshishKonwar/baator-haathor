import { useTexture } from "@react-three/drei";

export default function Treeline() {
  const treeTexture = useTexture("/textures/trees.png");

  return (
    <mesh position={[0, 70, -2600]}>
      <planeGeometry args={[1400, 180]} />
      <meshBasicMaterial
        map={treeTexture}
        transparent
      />
    </mesh>
  );
}