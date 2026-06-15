import { Canvas } from "@react-three/fiber";
import { PointerLockControls, Sky, useProgress, Html } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";

import Ground from "./components/Ground";
import Road from "./components/Road";
import Player from "./components/Player";
import { questions } from "./constants/questions&answers";
import QuestionBoard from "./components/QuestionBoard";
import AnswerOptions from "./components/AnswerOptions";
import SuccessEffect from "./ui/SuccessEffect";
import FailEffect from "./ui/FailureEffect";
import TeaGarden from "./components/TeaGarden";
import Fence from "./components/Fench";
import Forest from "./components/Forest";
import Mountains from "./components/Mountains";

import { Physics } from "@react-three/rapier";
import GameEnd from "./components/Gameend";

  const assameseDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  const toAssameseNumber = (num) =>
    num
      .toString()
      .split("")
      .map((digit) => assameseDigits[digit] || digit)
      .join("");

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          border: "6px solid rgba(255,255,255,0.2)",
          borderTop: "6px solid #f7cfa5",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }} />
        <div style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
          Loading... {Math.round(progress)}%
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

function App() {
  const playerRef = useRef();

  // ✅ Audio refs
  // const successAudioRef = useRef(new Audio("/audio/success.mp3"));
  // const failAudioRef    = useRef(new Audio("/audio/fail.mp3"));

  const mobileControls = useRef({ forward: false, backward: false });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions]       = useState(new Set());
  const [score, setScore]                               = useState(0);
  const [answered, setAnswered]                         = useState(false);
  const [gameOver, setGameOver]                         = useState(false);
  const [effect, setEffect]                             = useState(null);

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);
    setAnsweredQuestions((prev) => new Set([...prev, currentQuestion.id]));

    if (option.correct) {
      setScore((prev) => prev + 10);
      setEffect("success");
      // ✅ Play success sound
      // successAudioRef.current.currentTime = 0;
      // successAudioRef.current.play();
    } else {
      const newScore = Math.max(score - 5, 0);
      setScore(newScore);
      setEffect("fail");
      // ✅ Play fail sound
      // failAudioRef.current.currentTime = 0;
      // failAudioRef.current.play();

      if (newScore <= 0) {
        setTimeout(() => setGameOver(true), 1000);
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
      <div style={{
        width: "100vw", height: "100vh", background: "black", color: "white",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        <h1>GAME OVER</h1>
        <button onClick={() => { setScore(10); setCurrentQuestionIndex(0); setAnswered(false); setGameOver(false); }}>
          Continue
        </button>
        <button onClick={() => window.location.reload()}>Exit</button>
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
          color: "#fff",
          fontSize: "40px",
          fontWeight: "900",
          textShadow: `
            1px 1px 0 #32cd32,
            2px 2px 0 #28a428,
            3px 3px 0 #1f7a1f,
            4px 4px 0 #145214,
            0 0 10px #32cd32,
            0 0 20px #32cd32,
            0 0 30px #32cd32,
            5px 5px 10px rgba(50, 205, 50, 0.7)
          `,
        }}
      >
          স্কোৰ: {toAssameseNumber(score)}
      </div>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 100 }}>
        <color attach="background" args={["#ffffff"]} />
        <fog attach="fog" args={["#ffffff", 500, 5000]} />

        <ambientLight intensity={2} />
        <directionalLight position={[-200, 80, -100]} intensity={2} />

        {/* <ambientLight intensity={1.2} color="#fff4d6" /> */}
        <directionalLight
          position={[-200, 80, -100]} intensity={2.5} color="#ffd8a8"
          castShadow shadow-mapSize-width={4096} shadow-mapSize-height={4096}
        />

        <Suspense fallback={<Loader />}>
        <Physics gravity={[0, -9.81, 0]}>
          <Ground />
          <Forest />
          <TeaGarden />
          <Fence />

          {questions
            .filter((q) => !answeredQuestions.has(q.id))
            .map((q) => (
              <QuestionBoard
                key={q.id}
                questionImage={q.questionImage}
                position={[0, 20, q.zPosition]}
              />
            ))}

          {questions
            .filter((q) => !answeredQuestions.has(q.id))
            .map((q) => (
              <AnswerOptions
                key={q.id}
                options={q.options}
                playerRef={playerRef}
                onAnswer={handleAnswer}
                answered={q.id === currentQuestion.id ? answered : false}
                zPosition={q.zPosition}
              />
            ))}

          {effect === "success" && <SuccessEffect />}
          {effect === "fail"    && <FailEffect />}
         <Sky
          distance={450000}
          sunPosition={[-200, 50, -100]}
          inclination={0.49}
          azimuth={0.15}
        />
      <Mountains />
          <Road />
          <GameEnd />
          <Player playerRef={playerRef} mobileControls={mobileControls} />
          <PointerLockControls />
          </Physics>  
        </Suspense>
      </Canvas>

      <button
        onTouchStart={() => { mobileControls.current.forward = true; }}
        onTouchEnd={()   => { mobileControls.current.forward = false; }}
        onMouseDown={() => { mobileControls.current.forward = true; }}
        onMouseUp={()   => { mobileControls.current.forward = false; }}
        style={{
          position: "fixed", right: "30px", bottom: "40px",
          width: "110px", height: "110px", borderRadius: "50%",
          border: "2px solid white", background: "rgba(255,255,255,0.25)",
          color: "white", fontSize: "20px", fontWeight: "bold",
          zIndex: 9999, touchAction: "none",
        }}
      >↑</button>

      <button
        onTouchStart={() => { mobileControls.current.backward = true; }}
        onTouchEnd={()   => { mobileControls.current.backward = false; }}
        onMouseDown={() => { mobileControls.current.backward = true; }}
        onMouseUp={()   => { mobileControls.current.backward = false; }}
        style={{
          position: "fixed", left: "30px", bottom: "40px",
          width: "110px", height: "110px", borderRadius: "50%",
          border: "2px solid white", background: "rgba(255,255,255,0.25)",
          color: "white", fontSize: "20px", fontWeight: "bold",
          zIndex: 9999, touchAction: "none",
        }}
      >↓</button>
    </div>
  );
}

export default App;