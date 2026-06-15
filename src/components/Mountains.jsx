import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export default function Mountains() {
  const mountainTexture = useTexture("/textures/hills.png");
  const meshRef = useRef();

  // Custom shader material that fades top to transparent
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: mountainTexture },
        fadeStart: { value: 0.4 }, // bottom 40% is fully visible
        fadeEnd:   { value: 1.0 }, // top edge is fully transparent
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float fadeStart;
        uniform float fadeEnd;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(map, vUv);

          // vUv.y = 0 at bottom, 1 at top
          // smoothstep fades alpha from 1 → 0 as vUv.y goes fadeStart → fadeEnd
          float fade = 1.0 - smoothstep(fadeStart, fadeEnd, vUv.y);

          // Also discard fully transparent pixels from the PNG
          if (color.a < 0.05) discard;

          gl_FragColor = vec4(color.rgb, color.a * fade);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [mountainTexture]);

  useFrame(({ camera }) => {
    if (!meshRef.current) return;

    const offset = new THREE.Vector3(0, 0, -800);
    offset.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));

    meshRef.current.position.x = camera.position.x + offset.x;
    meshRef.current.position.z = camera.position.z + offset.z;
    meshRef.current.position.y = 80;

    meshRef.current.rotation.y = camera.rotation.y;
  });

  return (
    <mesh ref={meshRef} renderOrder={-1} material={material}>
      <planeGeometry args={[2000, 600]} />
    </mesh>
  );
}
