export default function TeaBush({ position }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#2f7d32" />
    </mesh>
  );
}