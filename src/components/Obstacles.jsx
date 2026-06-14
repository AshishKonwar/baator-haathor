export default function Obstacles() {
  return (
    <>
      <mesh position={[-8, 2, -40]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh position={[0, 2, -40]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh position={[8, 2, -40]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}