import { Html } from "@react-three/drei";

export default function SuccessEffect() {
  return (
    <Html center>
      <div
        style={{
          color: "#ffffff",
          fontSize: "60px",
          fontWeight: "bold",
          textShadow: `
            1px 1px 0 #2e7d32,
            2px 2px 0 #2e7d32,
            3px 3px 0 #2e7d32,
            4px 4px 0 #2e7d32,
            5px 5px 6px rgba(0,0,0,0.4)
          `,
          transform: "perspective(500px) rotateX(15deg)",
          letterSpacing: "2px",
          userSelect: "none",
        }}
      >
        শুদ্ধ!
      </div>
    </Html>
  );
}