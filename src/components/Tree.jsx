export default function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 4]} />
        <meshStandardMaterial color="#6b4423" />
      </mesh>

      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial color="#2f8a2f" />
      </mesh>
    </group>
  );
}