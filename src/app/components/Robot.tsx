"use client";

import Arrow from "./Arrow";
import Wheel from "./Wheel";

export interface RobotProps {
  width: number;
  height: number;
  wheelPositions: Node[];
  name?: string;
  globalDirectionVector?: { x: number; y: number };
  wheelSize?: number;
  fontSize?: string;
  className?: string;
  path?: Node[];
}

export interface Node {
  x: number;
  y: number;
}

export default function Robot(props: RobotProps) {
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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <svg width="100%" height="100%" className="overflow-visible">
          {props.path && props.path.length > 0 && (
            <path
              d={`M ${props.width} ${props.height / 2} Q ${props.width + 50} ${
                props.height / 2
              } ${props.path[0].x} ${props.path[0].y} ${props.path
                .slice(1)
                .map((node) => `L ${node.x} ${node.y}`)
                .join(" ")}`}
              stroke="rgba(76, 175, 80, 0.6)"
              strokeWidth={props.height / 2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>

      <div
        className={
          props.className +
          " relative border-2 border-white overflow-visible z-10 w-full h-full"
        }
      >
        {/* Robot Name */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-lg font-bold uppercase z-10">
          {props.name}
        </div>

        {/* Wheels */}
        {wheelPositions.map((pos, i) => {
          const vector = props.wheelPositions[i];
          const hasValidVector =
            vector &&
            typeof vector.x === "number" &&
            typeof vector.y === "number";
          const angle = hasValidVector
            ? Math.atan2(vector.y, vector.x) * (180 / Math.PI)
            : 0;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "center",
              }}
            >
              <Wheel
                size={props.wheelSize ?? 30}
                speed={
                  hasValidVector ? Math.sqrt(vector.x ** 2 + vector.y ** 2) : 0
                }
              />
            </div>
          );
        })}

        {/* Global Direction Vector */}
        {props.globalDirectionVector && (
          <Arrow
            x={props.width / 2}
            y={props.height / 2}
            angle={
              Math.atan2(
                props.globalDirectionVector.y,
                props.globalDirectionVector.x
              ) *
              (180 / Math.PI)
            }
            length={50}
            width={4}
            headSize={12}
            color="yellow"
          />
        )}
      </div>
    </div>
  );
}
