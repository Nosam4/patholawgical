import { useEffect, useState } from "react";
import "./CompletionConfetti.css";

const colors = ["#ffc857", "#ed6a9a", "#55cbbb", "#8d7cf4", "#58b9ef", "#ff8c5a"];
const pieces = Array.from({ length: 100 }, (_, index) => ({
  left: `${(index * 37.73) % 100}%`,
  color: colors[index % colors.length],
  delay: `${(index % 17) * 35}ms`,
  duration: `${2600 + (index % 11) * 110}ms`,
  drift: `${((index * 53) % 240) - 120}px`,
  spin: `${(index % 2 ? 1 : -1) * (360 + (index % 5) * 180)}deg`,
}));

export default function CompletionConfetti() {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFinished(true), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  if (finished) return null;

  return (
    <div className="completion-confetti" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          className="completion-confetti-piece"
          key={index}
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            "--confetti-drift": piece.drift,
            "--confetti-spin": piece.spin,
          }}
        />
      ))}
    </div>
  );
}
