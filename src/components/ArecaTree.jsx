export default function ArecaTree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 10]} />
        <meshStandardMaterial color="#b58863" />
      </mesh>

      <mesh position={[0, 10, 0]}>
        <sphereGeometry args={[2]} />
        <meshStandardMaterial color="#2e8b57" />
      </mesh>
    </group>
  );
}