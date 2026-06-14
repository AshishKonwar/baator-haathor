import { Html } from "@react-three/drei";

export default function FailEffect() {
  return (
    <Html center>
      <div
        style={{
          color: "red",
          fontSize: "60px",
          fontWeight: "bold",
        }}
      >
        WRONG!
      </div>
    </Html>
  );
}