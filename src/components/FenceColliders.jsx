import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function FenceColliders() {
  return (
    <>
      <RigidBody type="fixed">
        <CuboidCollider
          args={[0.5, 2, 950]}
          position={[-12, 1, -950]}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[0.5, 2, 950]}
          position={[12, 1, -950]}
        />
      </RigidBody>
    </>
  );
}