function Bamboo({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 8]} />
        <meshStandardMaterial color="#8db255" />
      </mesh>
    </group>
  );
}

export default function BambooCluster() {
  return (
    <>
      <Bamboo position={[0, 0, 0]} />
      <Bamboo position={[1, 0, 1]} />
      <Bamboo position={[-1, 0, 0]} />
      <Bamboo position={[1, 0, -1]} />
      <Bamboo position={[-1, 0, 1]} />
    </>
  );
}