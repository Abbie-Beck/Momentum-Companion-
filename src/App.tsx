import { useState } from "react";
import TaskContinuum from "./components/TaskContinuum";

type Task = {
  text: string;
  done: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const completedCount = tasks.filter(task => task.done).length;
const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const momentumIndex = tasks.findIndex((task) => !task.done);

  function addTask() {
    if (!input.trim()) return;

    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  }

  const completeCurrentTask = () => {
  const nextCompletedCount = completedCount + 1;

  setTasks(prev =>
    prev.map((task, idx) =>
      idx === momentumIndex
        ? { ...task, done: true }
        : task
    )
  );

  if (nextCompletedCount % 5 === 0) {
    setShowBreakPrompt(true);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(180deg, #e0e7ff 0%, #ede9fe 45%, #ffffff 100%)
        `,
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "2.5rem",
        color: "#0f172a",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        {/* LOGO */}
        <img
          src="/favicon.png"
          alt="Momentum Companion"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          style={{
            width: "190px",
            height: "190px",
            borderRadius: "20px",
            marginBottom: "10px",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            transform: isLogoHovered
              ? "translateY(-2px) scale(1.03)"
              : "translateY(0)",
            boxShadow: isLogoHovered
              ? `
    0 0 0 2px rgba(255, 255, 255, 0.25),
    0 0 12px rgba(255, 255, 255, 0.35),
    0 12px 30px rgba(37, 99, 235, 0.25)
              `
              : `
    0 0 0 2px rgba(255, 255, 255, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.08)
              `,
            }}
          />

        {/* TITLE */}
     <h1
        style={{
          margin: 0,
          fontSize: "2.2rem",
          color: "#1e3a8a",
          letterSpacing: "0.5px",
          textAlign: "center",
          textShadow: `
            0 0 6px rgba(37, 99, 235, 0.25),
            0 0 14px rgba(37, 99, 235, 0.15)
          `,
        }}
      >
        Momentum Companion
      </h1>

        {/* SUBTITLE */}
        <p
          style={{
            margin: "0.5rem 0 0",
            color: "#64748b",
            fontSize: "0.95rem",
            textAlign: "center",
          }}
        >
          One step. Right now.
        </p>
      </div>

      {/* INPUT CARD */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.8rem",
          background: "#ffffff",
          padding: "0.75rem",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px rgba(30, 58, 138, 0.08)",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          style={{
            border: "none",
            outline: "none",
            fontSize: "1rem",
            width: "240px",
            color: "#0f172a",
          }}
        />

        <button
          onClick={addTask}
          style={{
            background: "#0a2663",
            color: "white",
            border: "none",
            padding: "0.55rem 1rem",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 8px 18px rgba(106, 143, 224, 0.25)",
          }}
        >
          Add Task
        </button>
      </div>

      {showBreakPrompt && (
        <div className="break-prompt">
          <h2>🌿 Momentum Check-In</h2>

          <p>
            You've completed {completedCount + 1} tasks.
            Want to take a quick break?
          </p>

          <button onClick={() => setShowBreakPrompt(false)}>
            Take a Break
          </button>

          <button onClick={() => setShowBreakPrompt(false)}>
            I'm Good
          </button>
        </div>
      )}

      {/* CONTINUUM */}
      <TaskContinuum
        tasks={tasks}
        momentumIndex={momentumIndex}
        onComplete={completeCurrentTask}
      />
    </div>
  );
}