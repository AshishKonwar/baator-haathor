import { Image } from "@react-three/drei";

export default function QuestionBoard({
  questionImage,
  position,
}) {
  return (
    <group position={position}>
      <Image
        url={questionImage}
        position={[0, 11, 0.5]}
        scale={[26, 35]}
        transparent
      />

      <Image
        url={questionImage}
        position={[0, 11, 0.5]}
        scale={[26, 35]}
        rotation={[0, Math.PI, 0]}
        transparent
      />
    </group>
  );
}