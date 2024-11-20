"use client";

import { useEffect, useState } from "react";

export interface Obstacle {
  x: number;
  y: number;
  className?: string;
  children?: React.ReactNode;
}

interface PlayingFieldProps {
  children?: React.ReactNode;
}

export function PlayingField(props: PlayingFieldProps) {
  return (
    <div className="relative w-full h-full overflow-hidden border-gray-300 border-2 rounded-lg bg-gray-800">
      {props.children}
    </div>
  );
}

export function FieldObject(props: Obstacle) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
