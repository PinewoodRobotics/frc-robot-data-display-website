"use client";

import Wheel from "./Wheel";

export default function Robot(props: {
  width: number;
  height: number;
  wheelVectors: { x: number; y: number }[];
  name?: string;
}) {
  const wheelPositions = [
    { left: "10%", top: "10%" }, // Top Left
    { right: "10%", top: "10%" }, // Top Right
    { left: "10%", bottom: "10%" }, // Bottom Left
    { right: "10%", bottom: "10%" }, // Bottom Right
  ];

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        position: "relative",
      }}
    >
      {/* Robot Body */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "3px solid white",
          borderRadius: "10px",
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        {props.name}
      </div>

      {/* Wheels */}
      {wheelPositions.map((pos, i) => {
        const vector = props.wheelVectors[i] || { x: 0, y: 0 };

        // Calculate rotation angle in degrees
        const angle = Math.atan2(vector.y, vector.x) * (180 / Math.PI);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              transform: `rotate(${angle}deg)`, // Rotate wheel
              transformOrigin: "center",
            }}
          >
            <Wheel
              size={40}
              speed={Math.sqrt(vector.x ** 2 + vector.y ** 2)} // Magnitude of vector as speed
            />
          </div>
        );
      })}
    </div>
  );
}
