"use client";

import React from "react";
import { useEffect, useState } from "react";

export interface Obstacle {
  x: number;
  y: number;
  className?: string;
  children?: React.ReactNode;
}

interface PlayingFieldProps {
  children?: React.ReactNode;
  showAxes?: boolean;
  axisColor?: string;
}

interface FieldObjectProps extends Obstacle {
  containerDimensions?: { width: number; height: number };
}

export function PlayingField(props: PlayingFieldProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { showAxes = false, axisColor = "#4b5563" } = props;

  useEffect(() => {
    if (container) {
      const updateDimensions = () => {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [container]);

  return (
    <div
      ref={setContainer}
      className="relative w-full h-full overflow-hidden border-gray-300 border-2 rounded-lg bg-gray-800"
    >
      {showAxes && container && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: axisColor,
              transform: "translateX(-50%)",
            }}
            className="z-0"
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: axisColor,
              transform: "translateY(-50%)",
            }}
          />
        </>
      )}
      {container &&
        React.Children.map(props.children, (child) => {
          if (React.isValidElement<FieldObjectProps>(child)) {
            return React.cloneElement(child, {
              containerDimensions: dimensions,
            });
          }
          return child;
        })}
    </div>
  );
}

export function FieldObject(
  props: FieldObjectProps & { objDimensions: { width: number; height: number } }
) {
  const { x, y, containerDimensions, className, children } = props;

  if (!containerDimensions) return null;

  const centerX = containerDimensions.width / 2;
  const centerY = containerDimensions.height / 2;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x + centerX - props.objDimensions.width / 2}px`,
        top: `${y + centerY - props.objDimensions.height / 2}px`, // Subtract y because CSS coordinates go down
      }}
      className={className + " transition-all duration-75"}
    >
      {children}
    </div>
  );
}

export function FieldText(props: {
  text: string;
  x: number;
  y: number;
  className?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
      className={props.className}
    >
      {props.text}
    </div>
  );
}

export function VelocityMeter(props: {
  velocity: number;
  maxVelocity: number;
}) {
  const percentage = Math.min((props.velocity / props.maxVelocity) * 100, 100);

  return (
    <div className="flex items-center gap-2 h-full">
      <div className="h-full w-full bg-gray-700 rounded-sm relative overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-blue-500 transition-all duration-200"
          style={{ height: `${percentage}%` }}
        />
      </div>
      <div className="text-sm text-gray-300 whitespace-nowrap">
        {props.velocity.toFixed(1)}m/s
      </div>
    </div>
  );
}
