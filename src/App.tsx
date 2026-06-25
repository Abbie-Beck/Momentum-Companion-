import { useState } from "react";
import TaskContinuum from "./components/TaskContinuum";

type Task = {
  text: string;
  done: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const momentumIndex = tasks.findIndex(task => !task.done);

  function addTask() {
    if (!input.trim()) return;

    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  }

  function completeCurrentTask() {
    if (momentumIndex === -1) return;

    setTasks(prev =>
      prev.map((t, i) =>
        i === momentumIndex ? { ...t, done: true } : t
      )
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5f9ff, #ffffff)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2.5rem",
        color: "#0f172a",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "2.2rem",
            color: "#1e3a8a",
            letterSpacing: "0.5px",
          }}
        >
          Momentum
        </h1>

        <p
          style={{
            margin: "0.5rem 0 0",
            color: "#64748b",
            fontSize: "0.95rem",
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
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "0.55rem 1rem",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 8px 18px rgba(37,99,235,0.25)",
            transition: "transform 0.1s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "scale(0.97)")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Add
        </button>
      </div>

      {/* CONTINUUM WRAPPER */}
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <TaskContinuum
          tasks={tasks}
          momentumIndex={momentumIndex}
          onComplete={completeCurrentTask}
        />
      </div>
    </div>
  );
}