import { useMemo } from "react";
import Trees from "./Trees";

export default function DenseTrees() {
  const trees = [];

  for (let z = -2500; z < 2500; z += 15) {
    trees.push(
      <Trees
        key={`left-${z}`}
        position={[-20 - 1000 * 30, 0, z]}
      />
    );

    trees.push(
      <Trees
        key={`right-${z}`}
        position={[20 + 1000 * 30, 0, z]}
      />
    );
  }

  return <>{trees}</>;
}