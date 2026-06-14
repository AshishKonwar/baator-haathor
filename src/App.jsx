import { Canvas } from "@react-three/fiber";
import { PointerLockControls, Sky } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import Ground from "./components/Ground";
import Road from "./components/Road";
import Player from "./components/Player";
import Obstacles from "./components/Obstacles";
import { questions } from "./constants/questions&answers";
import QuestionBoard from "./components/QuestionBoard";
import AnswerOptions from "./components/AnswerOptions";
import SuccessEffect from "./ui/SuccessEffect";
import FailEffect from "./ui/FailureEffect";
import TeaGarden from "./components/TeaGarden";
import Hills from "./components/Hills";
import Tree from "./components/Tree";
import Fence from "./components/Fench";
import Forest from "./components/Forest";
import * as THREE from "three";

function App() {

  const playerRef = useRef();

  const mobileControls = useRef({
    forward: false,
    backward: false,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [effect, setEffect] = useState(null);

  const handleAnswer = (option) => {
  if (answered) return;

  setAnswered(true);

  if (option.correct) {
    setScore((prev) => prev + 10);
    setEffect("success");

  } else {
    const newScore = Math.max(score - 5, 0);

    setScore(newScore);
    setEffect("fail");

    if (newScore <= 0) {
      setTimeout(() => {
        setGameOver(true);
      }, 1000);

      return;
    }
  }

  setTimeout(() => {
    setEffect(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswered(false);
    } else {
      alert("Quiz Completed!");
    }
  }, 3000);
};

    useEffect(() => {
      localStorage.setItem("score", score);
    }, [score]);

  const currentQuestion = questions[currentQuestionIndex];
  
  if (gameOver) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>GAME OVER</h1>

      <button
        onClick={() => {
          setScore(10);
          setCurrentQuestionIndex(0);
          setAnswered(false);
          setGameOver(false);
        }}
      >
        Continue
      </button>

      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Exit
      </button>
    </div>
  );
}

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 100,
          color: "black", 
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Score: {score}
      </div>
      <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 60 }}
    >
  <color attach="background" args={["#f7cfa5"]} />
  
  <ambientLight intensity={1.2} color="#fff4d6" />

  <directionalLight
    position={[-200, 80, -100]}
    intensity={2.5}
    color="#ffd8a8"
    castShadow
    shadow-mapSize-width={4096}
    shadow-mapSize-height={4096}
  />

  <Ground />

    <Forest/>
    <TeaGarden />
    <Fence />
    <Hills />

    {/* <Tree position={[-70, 0, -30]} />
    <Tree position={[70, 0, -60]} /> */}

    <QuestionBoard
      key={`question-${currentQuestion.id}`}
      questionImage={currentQuestion.questionImage}
      position={[0, 20, currentQuestion.zPosition]}
      />

  <AnswerOptions
    key={`options-${currentQuestion.id}`}
    options={currentQuestion.options}
    playerRef={playerRef}
    onAnswer={handleAnswer}
    answered={answered}
    zPosition={currentQuestion.zPosition}
  />

  {effect === "success" && <SuccessEffect />}
  {effect === "fail" && <FailEffect />}

  <Road />
  
  <Sky
  distance={450000}
  sunPosition={[-200, 50, -100]}
  inclination={0.49}
  azimuth={0.15}
  />

  <Player playerRef={playerRef}
  mobileControls={mobileControls} />
  <PointerLockControls />
  </Canvas>
    <button
  onTouchStart={() => {
    mobileControls.current.forward = true;
  }}
  onTouchEnd={() => {
    mobileControls.current.forward = false;
  }}
  onMouseDown={() => {
    mobileControls.current.forward = true;
  }}
  onMouseUp={() => {
    mobileControls.current.forward = false;
  }}
  style={{
    position: "fixed",
    right: "30px",
    bottom: "40px",
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "2px solid white",
    background: "rgba(255,255,255,0.25)",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: 9999,
    touchAction: "none",
  }}
  >
    ↑
  </button>

  <button
    onTouchStart={() => {
      mobileControls.current.backward = true;
    }}
    onTouchEnd={() => {
      mobileControls.current.backward = false;
    }}
    onMouseDown={() => {
      mobileControls.current.backward = true;
    }}
    onMouseUp={() => {
      mobileControls.current.backward = false;
    }}
    style={{
      position: "fixed",
      left: "30px",
      bottom: "40px",
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      border: "2px solid white",
      background: "rgba(255,255,255,0.25)",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      zIndex: 9999,
      touchAction: "none",
    }}
  >
     ↓
  </button>
  </div>
  
  );
}

export default App;