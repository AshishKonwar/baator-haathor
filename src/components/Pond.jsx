export default function Pond({ position }) {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <circleGeometry args={[8, 32]} />
      <meshStandardMaterial
        color="#4da6ff"
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}