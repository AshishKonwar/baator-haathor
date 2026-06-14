export default function PaddyField({ position }) {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#9acd32" />
    </mesh>
  );
}