import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Character({ animationName }) {
  const group = useRef();

  const character = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Idle_3_withSkin.glb"
  );

  const idle = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Idle_3_withSkin.glb"
  );

  const walk = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Walking_withSkin.glb"
  );

  const run = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Running_withSkin.glb"
  );

  const jump = useGLTF(
    "/models/Meshy_AI_Animation_Regular_Jump_withSkin.glb"
  );

  const turnLeftWalk = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Walk_Turn_Left_withSkin.glb"
  );
  
  const turnRightWalk = useGLTF(
    "/models/Meshy_AI_Animation_Walk_Turn_Right_withSkin.glb"
  ); 

  const turnLeftRun  = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Run_Turn_Left_withSkin.glb"
  );
  
  const turnRightRun = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Run_Turn_Right_withSkin.glb"
  ); 

  const animations = [
    ...idle.animations,
    ...walk.animations,
    ...run.animations,
    ...jump.animations,
    ...turnLeftWalk.animations,
    ...turnRightWalk.animations,
    ...turnLeftRun.animations,
    ...turnRightRun.animations
  ];

  const { actions } =
    useAnimations(animations, group);

  useEffect(() => {
    console.log("Idle animations:", idle.animations);
    console.log("Walk animations:", walk.animations);
    console.log("Run animations:", run.animations);
    console.log("Jump animations:", jump.animations);
    console.log("turnLeftWalk animations:", turnLeftWalk.animations);
    console.log("turnRightWalk animations:", turnRightWalk.animations);
    console.log("turnLeftRun animations:", turnLeftRun.animations);
    console.log("turnRightRun animations:", turnRightRun.animations);

    console.log(
    "Animation names:",
    animations.map((a) => a.name)
  );
    Object.values(actions).forEach((action) => {
      action?.stop();
    });

    actions[animationName]
      ?.reset()
      .fadeIn(0.2)
      .play();

    return () => {
      actions[animationName]?.fadeOut(0.2);
    };
  }, [animationName, actions]);

  return (
    <primitive
      ref={group}
      object={character.scene}
    />
  );
}