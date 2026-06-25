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
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "12px",
          height: "320px",
        }}
      >
        {tasks.map((task, index) => {
          const distance = index - momentumIndex;

          if (distance < -2 || distance > 2) return null;

          const isCurrent = distance === 0;
          const accent = colors[index % colors.length];

          return (
            <div
              key={index}
              style={{
                flex: "0 0 160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "all 0.35s ease",
              }}
            >
              <div
                style={{
                  height: isCurrent ? "220px" : "180px",
                  borderRadius: "16px",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(226, 232, 240, 0.6)",
                  boxShadow: "0 10px 30px rgba(30, 58, 138, 0.08)",
                  border: isCurrent
                    ? `2px solid ${accent}`
                    : "1px solid #e2e8f0",
                  boxShadow: isCurrent
                    ? "0 16px 35px rgba(37, 99, 235, 0.18)"
                    : "0 4px 10px rgba(0,0,0,0.04)",
                  opacity: isCurrent
                    ? 1
                    : distance === 1 || distance === -1
                      ? 0.7
                      : 0.5,
                  transform: isCurrent
                    ? "translateY(-6px)"
                    : "scale(0.95)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: isCurrent ? 600 : 400,
                      color: "#0f172a",
                      fontSize: "0.95rem",
                    }}
                  >
                    {task.text} {task.done ? "✓" : ""}
                  </div>
                </div>

                {isCurrent && !task.done && (
                  <Button
                    onClick={onComplete}
                    size="sm"
                  >
                    Done
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