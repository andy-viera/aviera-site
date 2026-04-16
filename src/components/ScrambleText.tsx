"use client";

import { useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  texts: string[];
  cycleMs?: number;
  scrambleDurationMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrambleText({
  texts,
  cycleMs = 3500,
  scrambleDurationMs = 800,
  className = "",
  style = {},
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(texts[0]);
  const indexRef = useRef(0);
  const frameRef = useRef<number>(0);
  const lengthRef = useRef(texts[0].length);

  useEffect(() => {
    function scrambleTo(target: string) {
      const startTime = performance.now();
      const maxLen = Math.max(lengthRef.current, target.length);

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / scrambleDurationMs);
        const resolved = Math.floor(progress * target.length);

        let result = "";
        for (let i = 0; i < maxLen; i++) {
          if (i < resolved) {
            result += target[i] || "";
          } else if (i < target.length) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(target);
          lengthRef.current = target.length;
        }
      }

      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(step);
    }

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % texts.length;
      scrambleTo(texts[indexRef.current]);
    }, cycleMs);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(frameRef.current);
    };
  }, [texts, cycleMs, scrambleDurationMs]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
}
