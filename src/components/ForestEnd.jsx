import Trees from "../components/Trees";

export default function ForestEnd() {
  const trees = [];

  for (let x = -100; x <= 100; x += 8) {
    trees.push(
      <Trees
        key={x}
        position={[x, 0, 2500]}
      />
    );
  }

  return <>{trees}</>;
}