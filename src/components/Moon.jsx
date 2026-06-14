export default function Moon() {
  return (
    <group position={[150, 120, -300]}>
      <mesh>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#fffdf0" />
      </mesh>

      <mesh>
        <sphereGeometry args={[25, 32, 32]} />
        <meshBasicMaterial
          color="#f1edb4"
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[35, 32, 32]} />
        <meshBasicMaterial
          color="#dfe8ff"
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}