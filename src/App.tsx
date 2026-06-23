import { useState } from "react";

type Task = {
  text: string;
  done: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  function addTask() {
    if (!input.trim()) return;

    setTasks([...tasks, { text: input, done: false}]);
    setInput("");
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Momentum</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  const updated = tasks.map((t, i) => 
                    i === index ? { ...t, done: !t.done } : t
                  );
                setTasks(updated);
              }}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {task.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
}