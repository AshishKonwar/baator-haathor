export default function Trees() {
  return (
    <>
      <mesh position={[5, 2, 5]}>
        <cylinderGeometry args={[0.5, 0.5, 4]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      <mesh position={[x, 8, z]}>
        <coneGeometry args={[4, 12, 6]} />
        <meshStandardMaterial color="#0f2a12" />
      </mesh>
    </>
  );
}