export default function Ground() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -1500]}
      >
        <planeGeometry args={[300, 3000]} />
        <meshStandardMaterial color="#4c9a2a" />
      </mesh>
    </group>
  );
}