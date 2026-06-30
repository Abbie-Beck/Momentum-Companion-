import { Button } from "@/components/ui/button";

type Task = {
  text: string;
  done: boolean;
};

type Props = {
  tasks: Task[];
  momentumIndex: number;
  onComplete: () => void;
};

export default function TaskContinuum({
  tasks,
  momentumIndex,
  onComplete,
}: Props) {
  const colors = [
    "#2563EB",
    "#22C55E",
    "#F59E0B",
    "#EC4899",
    "#8B5CF6",
  ];

  if (momentumIndex === -1) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          fontSize: "1.25rem",
          color: "#0f172a",
        }}
      >
        🎉 All tasks completed!
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "320px",
          overflow: "hidden",
        }}
      >
        {tasks.map((task, index) => {
          const distance = index - momentumIndex;

          if (Math.abs(distance) > 2) return null;

          const isCurrent = distance === 0;
          const accent = colors[index % colors.length];

          const scale =
            distance === 0 
            ? 1 
            : Math.abs(distance) === 1 
            ? 0.9 
            : 0.8;

          const xOffset = distance * 180;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "160px",
                transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
                transition: "all 0.4s ease",
                zIndex: isCurrent ? 10 : 5,
              }}
            >
              <div
                style={{
                  height: isCurrent ? "220px" : "180px",
                  padding: "1rem",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  border: isCurrent
                    ? `2px solid ${accent}`
                    : "1px solid #e2e8f0",
                  boxShadow: isCurrent
                    ? "0 16px 35px rgba(37, 99, 235, 0.18)"
                    : "0 4px 10px rgba(0,0,0,0.04)",
                  opacity: isCurrent
                    ? 1
                    : Math.abs(distance) === 1
                    ? 0.7
                    : 0.45,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontWeight: isCurrent ? 600 : 400,
                    color: task.done ? "#94a3b8" : "#0f172a",
                    textDecoration: task.done ? "line-through" : "none",
                    fontSize: "0.95rem",
                  }}
                >
                  {task.text}
                </div>

                {isCurrent && !task.done && (
                  <Button onClick={onComplete} size="sm">
                    Accomplished →
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}