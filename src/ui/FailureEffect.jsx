import { Html } from "@react-three/drei";

export default function FailEffect() {
  return (
    <Html center>
      <div
        style={{
          color: "#f7f4f4",
          fontSize: "70px",
          fontWeight: "900",
          textShadow: `
            1px 1px 0 #b71c1c,
            2px 2px 0 #b71c1c,
            3px 3px 0 #b71c1c,
            4px 4px 0 #b71c1c,
            5px 5px 0 #b71c1c,
            6px 6px 0 #b71c1c,
            7px 7px 10px rgba(0,0,0,0.5)
          `,
          transform: "perspective(800px) rotateX(20deg) scale(1.1)",
          letterSpacing: "2px",
          userSelect: "none",
        }}
      >
        ভুল!
      </div>
    </Html>
  );
}