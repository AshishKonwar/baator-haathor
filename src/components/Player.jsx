import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Character from "./Character";
import { useState } from "react";

const FENCE_LEFT  = -12;  // left fence X
const FENCE_RIGHT =  12;  // right fence X
const PLAYER_RADIUS = 1;  // how close player can get to fence

export default function Player({ playerRef, mobileControls }) {
  const { camera } = useThree();

  const velocityY = useRef(0);
  const isGrounded = useRef(true);

  const cameraTarget = useRef(new THREE.Vector3());

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const touchMovement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const [currentAnimation, setCurrentAnimation] =
    useState("Armature|Idle_3|baselayer");

  const distance = 7.3;
  const height = 4.5;

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    space: false,
  });

  const cameraAngle = useRef(Math.PI);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) keys.current[key] = true;
      if (e.code === "Space") keys.current.space = true;
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) keys.current[key] = false;
      if (e.code === "Space") keys.current.space = false;
    };

    const handleMouseMove = (e) => {
      cameraAngle.current -= e.movementX * 0.01;
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartX.current;
      const dy = touch.clientY - touchStartY.current;

      cameraAngle.current -= dx * 0.005;

      touchMovement.current.forward  = dy < -30;
      touchMovement.current.backward = dy > 30;
      touchMovement.current.left     = dx < -30;
      touchMovement.current.right    = dx > 30;

      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    };

    const handleTouchEnd = () => {
      touchMovement.current = {
        forward: false, backward: false,
        left: false,    right: false,
      };
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove,   { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useFrame(() => {
    if (!playerRef.current) return;

    let nextAnimation = "Armature|Idle_3|baselayer";

    const walkSpeed = 0.2;
    const runSpeed  = 0.5;

    const isMobileRunning =
      mobileControls?.current?.forward ||
      mobileControls?.current?.backward;

    const speed = keys.current.shift || isMobileRunning
      ? runSpeed
      : walkSpeed;

    const angle = cameraAngle.current;

    let movementAngle = angle;
    if (keys.current.s || mobileControls?.current?.backward) {
      movementAngle = angle + Math.PI;
    }

    playerRef.current.rotation.y +=
      (movementAngle - playerRef.current.rotation.y) * 0.15;

    const forwardX = Math.sin(angle);
    const forwardZ = Math.cos(angle);
    const rightX   = -Math.cos(angle);
    const rightZ   = Math.sin(angle);

    const isMoving =
      keys.current.w || keys.current.a ||
      keys.current.s || keys.current.d ||
      mobileControls?.current?.forward ||
      mobileControls?.current?.backward;

    if (isMoving) nextAnimation = "Armature|walking_man|baselayer";

    if (isMoving && (keys.current.shift || isMobileRunning)) {
      nextAnimation = "Armature|running|baselayer";
    }

    if (keys.current.space) {
      nextAnimation = "Armature|Regular_Jump|baselayer";
    }

    // ── Movement ──────────────────────────────────────────
    if (keys.current.w || touchMovement.current.forward || mobileControls?.current?.forward) {
      playerRef.current.position.x += forwardX * speed;
      playerRef.current.position.z += forwardZ * speed;
    }

    if (keys.current.s || touchMovement.current.backward || mobileControls?.current?.backward) {
      playerRef.current.position.x -= forwardX * speed;
      playerRef.current.position.z -= forwardZ * speed;
    }

    if (keys.current.a || touchMovement.current.left) {
      playerRef.current.position.x -= rightX * speed;
      playerRef.current.position.z -= rightZ * speed;
    }

    if (keys.current.d || touchMovement.current.right) {
      playerRef.current.position.x += rightX * speed;
      playerRef.current.position.z += rightZ * speed;
    }

    // ✅ Clamp player X between the two fences
    playerRef.current.position.x = THREE.MathUtils.clamp(
      playerRef.current.position.x,
      FENCE_LEFT  + PLAYER_RADIUS,
      FENCE_RIGHT - PLAYER_RADIUS
    );

    // ✅ Clamp player Z — can't go back beyond starting position
    playerRef.current.position.z = THREE.MathUtils.clamp(
      playerRef.current.position.z,
      -1492,  
      -50  
    );

    // ── Jump & gravity ────────────────────────────────────
    if (keys.current.space && isGrounded.current) {
      velocityY.current = 0.25;
      isGrounded.current = false;
    }

    velocityY.current -= 0.01;
    playerRef.current.position.y += velocityY.current;

    if (playerRef.current.position.y <= 1) {
      playerRef.current.position.y = 1;
      velocityY.current = 0;
      isGrounded.current = true;
    }

    setCurrentAnimation((prev) =>
      prev === nextAnimation ? prev : nextAnimation
    );

    // ── Camera ────────────────────────────────────────────
    const playerPos = playerRef.current.position;

    cameraTarget.current.set(
      playerPos.x - Math.sin(angle) * distance,
      playerPos.y + height,
      playerPos.z - Math.cos(angle) * distance
    );

    camera.position.lerp(cameraTarget.current, 0.1);
    camera.lookAt(playerPos.x, playerPos.y + 3.5, playerPos.z);
  });
  
  return (
    <>
      <group
        ref={playerRef}
        position={[0, 1, 0]}
        rotation={[0, Math.PI, 0]}
      >
        <Character animationName={currentAnimation} />
      </group>
    </>
  );
}