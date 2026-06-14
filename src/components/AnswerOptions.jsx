import { Image } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Option({
  option,
  position,
  playerRef,
  onAnswer,
  answered,
}) {
  const optionRef = useRef();
  const answeredRef = useRef(false);

  useFrame(() => {
    if (
      !playerRef.current ||
      !optionRef.current ||
      answeredRef.current ||
      answered
    )
      return;

    const distance = playerRef.current.position.distanceTo(
      optionRef.current.position
    );

    if (distance < 4) {
      answeredRef.current = true;
      onAnswer(option);
    }
  });

  return (
    <group ref={optionRef} position={position}>
      <Image
        url={option.image}
        scale={[8, 8]}
      />

      <Image
        url={option.image}
        scale={[8, 8]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

export default function AnswerOptions({
  options,
  playerRef,
  onAnswer,
  answered,
  zPosition,
}) {
  const positions = [
    [-8, 4, zPosition - 20],
    [0, 4, zPosition - 20],
    [8, 4, zPosition - 20],
  ];

  return (
    <>
      {options.map((option, index) => (
        <Option
          key={option.id}
          option={option}
          position={positions[index]}
          playerRef={playerRef}
          onAnswer={onAnswer}
          answered={answered}
        />
      ))}
    </>
  );
}