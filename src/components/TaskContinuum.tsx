type Task = {
  text: string;
  done: boolean;
};

type Props = {
  tasks: Task[];
  focusIndex: number;
  onComplete: () => void;
  onToggle: (index: number) => void;
};

export default function TaskContinuum({
  tasks,
  focusIndex,
}: Props) {
  return (
    <div>
      <h2>Task Continuum</h2>

      <p>Focus Index: {focusIndex}</p>

      {tasks.map((task, index) => (
        <div key={index}>
          {task.text} {task.done ? "✓" : ""}
        </div>
      ))}
    </div>
  );
}