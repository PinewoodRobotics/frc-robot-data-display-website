"use client";

import { useEffect, useState } from "react";

interface WheelProps {
  speed: number; // Speed multiplier (positive for forward, negative for backward)
  size?: number; // Diameter in pixels
}

export default function Wheel({ speed, size = 40 }: WheelProps) {
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    // Calculate animation duration based on speed
    if (speed === 0) {
      setAnimationDuration(0);
    } else {
      setAnimationDuration(1000 / Math.abs(speed)); // Adjust speed to animation duration
    }
  }, [speed]);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Outer wheel */}
      <div
        style={{
          width: "100%",
          height: "20%", // Thin shape for the wheel
          background: "white",
          borderRadius: "10px",
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
        }}
      >
        {/* Tire marks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300%", // Extend the width for smooth looping
            height: "100%",
            backgroundSize: `${size / 4}px 100%`,
            backgroundImage: `linear-gradient(
              to right,
              transparent 80%,
              rgba(0, 0, 0, 1) 80%,
              rgba(0, 0, 0, 1) 100%
            )`,
            animationName: animationDuration ? "tire-move" : "none",
            animationDuration: `${animationDuration}ms`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: speed > 0 ? "normal" : "reverse",
          }}
        />
      </div>
    </div>
  );
}
