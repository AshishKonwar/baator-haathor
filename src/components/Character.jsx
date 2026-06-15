import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

const DRACO = "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";

export default function Character({ animationName }) {
  const group = useRef();

  const { scene } = useGLTF(
    "/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Idle_3_withSkin.glb",
    DRACO
  );

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { animations: idleAnims }          = useGLTF("/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Idle_3_withSkin.glb", DRACO);
  const { animations: walkAnims }          = useGLTF("/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Walking_withSkin.glb", DRACO);
  const { animations: runAnims }           = useGLTF("/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Running_withSkin.glb", DRACO);
  const { animations: jumpAnims }          = useGLTF("/models/Meshy_AI_Animation_Regular_Jump_withSkin.glb", DRACO);

  const animations = useMemo(() => [
    ...idleAnims,
    ...walkAnims,
    ...runAnims,
    ...jumpAnims,
  ], [idleAnims, walkAnims, runAnims, jumpAnims]);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions[animationName]) return;
    Object.values(actions).forEach((a) => a?.stop());
    actions[animationName].reset().fadeIn(0.2).play();
    return () => { actions[animationName]?.fadeOut(0.2); };
  }, [animationName, actions]);

  return <primitive ref={group} object={clonedScene} />;
}

// Preload all in parallel
useGLTF.preload("/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Idle_3_withSkin.glb", DRACO);
useGLTF.preload("/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Walking_withSkin.glb", DRACO);
useGLTF.preload("/models/Meshy_AI_Sunhat_Wanderer_biped_Animation_Running_withSkin.glb", DRACO);
useGLTF.preload("/models/Meshy_AI_Animation_Regular_Jump_withSkin.glb", DRACO);