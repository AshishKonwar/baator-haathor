import { Sparkles } from "@react-three/drei";

export default function SuccessEffect() {
  return (
    <Sparkles
      count={100}
      scale={[20, 20, 20]}
      size={10}
      speed={1}
    />
  );
}
