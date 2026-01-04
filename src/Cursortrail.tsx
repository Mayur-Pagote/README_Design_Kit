import { useEffect, useRef } from "react";

const DOT_COUNT = 8;

function Cursortrail() {
  const dotRefs = useRef<HTMLSpanElement[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const history = Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 }));
    const positions = Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // store latest mouse position
      history.unshift({ x: mouseX.current, y: mouseY.current });
      history.pop();

      dotRefs.current.forEach((dot, index) => {
        if (!dot) return;

        const target = history[index];
        const current = positions[index];

        // smoothing (lower = slower)
        current.x += (target.x - current.x) * 0.18;
        current.y += (target.y - current.y) * 0.18;

        dot.style.left = `${current.x}px`;
        dot.style.top = `${current.y}px`;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-container">
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <span
          key={index}
          className="cursor-dot"
          ref={(el) => {
            if (el) dotRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}

export default Cursortrail;
